import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './app.js';
test('Express API enforces session, project isolation and role restrictions',async()=>{
 const server=createApp().listen(0,'127.0.0.1');
 await new Promise(resolve=>server.once('listening',resolve));
 const base='http://127.0.0.1:'+server.address().port;let cookie='';
 const req=(path,method='GET',body)=>fetch(base+'/api'+path,{method,headers:{'Content-Type':'application/json',Cookie:cookie},...(body?{body:JSON.stringify(body)}:{})});
 async function login(role){const r=await req('/demo-session','POST',{role});assert.equal(r.status,200);cookie=r.headers.get('set-cookie').split(';')[0]}
 try{
 assert.equal((await req('/projects')).status,401);
 await login('Client');
 const clientProjects=await (await req('/projects')).json();assert.deepEqual(clientProjects.map(p=>p.id),['P-2401']);
 assert.equal((await req('/projects/P-2402')).status,404);
 assert.equal((await req('/projects/P-2402/documents')).status,404);
 assert.equal((await req('/projects/P-2401/documents','POST',{name:'x',category:'Drawings'})).status,403);
 assert.equal((await req('/users')).status,403);
 await login('Project Manager');
 assert.equal((await (await req('/projects')).json()).length,2);
 assert.equal((await req('/projects/P-2403')).status,404);
 assert.equal((await req('/projects/P-2401/updates','POST',{title:'Milestone',body:'Completed inspection.'})).status,201);
 assert.equal((await req('/projects/P-2401/progress','PATCH',{stageId:4,progress:101})).status,400);
 assert.equal((await req('/projects/P-2401/progress','PATCH',{stageId:4,progress:80})).status,200);
 assert.equal((await req('/users','POST',{})).status,403);
 await login('Administrator');
 assert.equal((await (await req('/projects')).json()).length,3);
 assert.equal((await req('/users','POST',{name:'Test Client',email:'client@example.com',role:'Client',project:'P-2403'})).status,201);
 assert.equal((await req('/users','POST',{name:'Bad Client',email:'bad@example.com',role:'Client',project:'P-2403, P-2402'})).status,400);
 const cross=await fetch(base+'/api/projects',{method:'POST',headers:{Origin:'https://untrusted.example','Content-Type':'application/json',Cookie:cookie},body:'{}'});assert.equal(cross.status,403);
 assert.equal((await req('/session','DELETE')).status,204);
 assert.equal((await req('/projects')).status,401);
 }finally{await new Promise(resolve=>server.close(resolve))}
});
