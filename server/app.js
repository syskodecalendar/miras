import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import {randomBytes} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {projects,stages,initialDocuments,initialUpdates,initialUsers} from '../src/data.js';

// Development-only API. Demo identities are intentionally selectable without a password.
// This is not a production authentication service. All changes are held in memory.
export function createApp(){
 const app=express();
 const db={projects:structuredClone(projects),documents:structuredClone(initialDocuments),updates:structuredClone(initialUpdates),users:structuredClone(initialUsers),stages:{'P-2401':structuredClone(stages)}};
 app.disable('x-powered-by');
 app.use(helmet({contentSecurityPolicy:{directives:{defaultSrc:["'self'"],scriptSrc:["'self'"],styleSrc:["'self'","'unsafe-inline'",'https://fonts.googleapis.com'],fontSrc:["'self'",'https://fonts.gstatic.com'],imgSrc:["'self'",'blob:','data:'],connectSrc:["'self'"]}}}));
 app.use('/api',rateLimit({windowMs:60000,limit:150,standardHeaders:'draft-7',legacyHeaders:false}));
 app.use(express.json({limit:'256kb'}));
 app.use(session({name:'miras.demo',secret:process.env.SESSION_SECRET||randomBytes(32).toString('hex'),resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:'strict',secure:process.env.COOKIE_SECURE==='true',maxAge:3600000}}));
 app.use('/api',(req,res,next)=>{res.set('Cache-Control','no-store');if(!['GET','HEAD','OPTIONS'].includes(req.method)&&req.headers.origin){try{if(new URL(req.headers.origin).host!==req.get('host'))return res.status(403).json({error:'Cross-origin writes are not allowed.'})}catch{return res.status(403).json({error:'Invalid request origin.'})}}next()});
 app.get('/api/health',(_,res)=>res.json({service:'miras-express',mode:'demo',persistence:'memory'}));
 app.post('/api/demo-session',(req,res)=>{const actors={'Client':1,'Project Manager':2,'Administrator':4};const id=actors[req.body.role];if(!id)return res.status(400).json({error:'Choose a valid demo role.'});req.session.regenerate(error=>{if(error)return res.status(500).json({error:'Unable to initialise demo session.'});req.session.actorId=id;req.session.save(()=>res.json({role:req.body.role,mode:'demo'}))})});
 app.delete('/api/session',(req,res)=>req.session.destroy(()=>{res.clearCookie('miras.demo');res.sendStatus(204)}));
 app.use('/api',(req,res,next)=>{const actor=db.users.find(u=>u.id===req.session.actorId);if(!actor)return res.status(401).json({error:'Start a demo session first.'});req.actor=actor;next()});
 const admin=(req,res,next)=>req.actor.role==='Administrator'?next():res.status(403).json({error:'Administrator access required.'});
 const editor=(req,res,next)=>req.actor.role!=='Client'?next():res.status(403).json({error:'Clients have read-only project access.'});
 const allowed=(actor,pid)=>actor.role==='Administrator'||actor.project.split(',').map(x=>x.trim()).includes(pid);
 const projectAccess=(req,res,next)=>{const p=db.projects.find(p=>p.id===req.params.id);if(!p||!allowed(req.actor,p.id))return res.status(404).json({error:'Project not found.'});req.project=p;next()};
 const clean=(value,max=200)=>typeof value==='string'?value.trim().slice(0,max):'';
 app.get('/api/projects',(req,res)=>res.json(db.projects.filter(p=>allowed(req.actor,p.id))));
 app.get('/api/projects/:id',projectAccess,(req,res)=>res.json(req.project));
 for(const type of ['documents','updates'])app.get('/api/projects/:id/'+type,projectAccess,(req,res)=>res.json(db[type].filter(d=>d.project===req.project.id)));
 app.get('/api/projects/:id/stages',projectAccess,(req,res)=>res.json(db.stages[req.project.id]||stages.map((s,i)=>({...s,progress:i<Math.floor(req.project.progress/20)?100:i===Math.floor(req.project.progress/20)?Math.min(90,req.project.progress):0}))));
 app.post('/api/projects/:id/documents',projectAccess,editor,(req,res)=>{const name=clean(req.body.name,150),category=clean(req.body.category);if(!name||!['Drawings','Invoices','Permits','Contracts','Delivery notes','Payment records'].includes(category))return res.status(400).json({error:'A document name and valid category are required.'});const record={id:Date.now(),project:req.project.id,name,ar:clean(req.body.ar,150),category,date:'28 Oct 2026',size:clean(req.body.size,30),status:'Pending review',by:req.actor.name};db.documents.unshift(record);res.status(201).json(record)});
 app.post('/api/projects/:id/updates',projectAccess,editor,(req,res)=>{const title=clean(req.body.title,140),body=clean(req.body.body,3000);if(!title||!body)return res.status(400).json({error:'An update title and description are required.'});const record={id:Date.now(),project:req.project.id,title,ar:clean(req.body.ar,140),body,bodyAr:clean(req.body.bodyAr,3000),date:'28 Oct 2026',author:req.actor.name,tag:'Site update'};db.updates.unshift(record);res.status(201).json(record)});
 app.patch('/api/projects/:id/progress',projectAccess,editor,(req,res)=>{const {stageId,progress}=req.body;if(!Number.isInteger(stageId)||stageId<1||stageId>6||!Number.isInteger(progress)||progress<0||progress>100)return res.status(400).json({error:'Use a valid stage and a progress value from 0 to 100.'});db.stages[req.project.id]??=structuredClone(stages).map((s,i)=>({...s,progress:i<Math.floor(req.project.progress/20)?100:i===Math.floor(req.project.progress/20)?Math.min(90,req.project.progress):0}));db.stages[req.project.id]=db.stages[req.project.id].map(s=>s.id===stageId?{...s,progress}:s);req.project.progress=Math.round(db.stages[req.project.id].reduce((sum,stage)=>sum+stage.progress*(stage.weight||100/6)/100,0));res.json({project:req.project,stages:db.stages[req.project.id]})});
 app.post('/api/projects',admin,(req,res)=>{const name=clean(req.body.name,120),location=clean(req.body.location,120),budget=Number(req.body.budget);if(!name||!location||!Number.isFinite(budget)||budget<=0||budget>1e9)return res.status(400).json({error:'Valid project name, location and contract value are required.'});const record={id:'P-'+Date.now().toString().slice(-5),name,nameAr:clean(req.body.nameAr,120)||name,location,locationAr:location,type:'Residential project',progress:0,status:'On track',start:'28 Oct 2026',completion:clean(req.body.completion,30),manager:'Syskode Technologies Project Team',client:clean(req.body.client,100),area:clean(req.body.area,50),budget,paid:0,image:'/villa.jpg'};db.projects.push(record);res.status(201).json(record)});
 app.get('/api/users',admin,(_,res)=>res.json(db.users));
 app.post('/api/users',admin,(req,res)=>{const name=clean(req.body.name,100),email=clean(req.body.email,150),role=clean(req.body.role);if(!name||!/^\S+@\S+\.\S+$/.test(email)||!['Client','Project Manager','Administrator'].includes(role))return res.status(400).json({error:'Valid name, email and role are required.'});const ids=clean(req.body.project,1000).split(',').map(x=>x.trim());if(role!=='Administrator'&&(!ids.length||ids.some(id=>!db.projects.some(p=>p.id===id))))return res.status(400).json({error:'Select valid assigned projects.'});if(role==='Client'&&ids.length!==1)return res.status(400).json({error:'Clients must have exactly one assigned project.'});const existing=db.users.find(u=>u.id===req.body.id);if(existing&&[1,2,4].includes(existing.id)&&(existing.role!==role||existing.project!==(role==='Administrator'?'All projects':ids.join(', '))))return res.status(400).json({error:'Built-in demo identity access is fixed. Add another demo user to explore assignments.'});if(db.users.some(u=>u.email===email&&u.id!==existing?.id))return res.status(400).json({error:'This email is already present.'});const record={id:existing?.id||Date.now(),name,email,role,project:role==='Administrator'?'All projects':ids.join(', '),status:'Active'};if(existing)Object.assign(existing,record);else db.users.push(record);res.status(existing?200:201).json(record)});
 app.use('/api',(_,res)=>res.status(404).json({error:'API route not found.'}));
 const dist=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
 app.use(express.static(dist));
 app.get('*',(_,res)=>res.sendFile(path.join(dist,'index.html')));
 app.use((err,req,res,next)=>{if(res.headersSent)return next(err);res.status(err.type==='entity.parse.failed'?400:500).json({error:err.type==='entity.parse.failed'?'Invalid JSON.':'Request could not be completed.'})});
 return app;
}
