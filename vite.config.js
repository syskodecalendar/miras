import {defineConfig} from 'vite';
import {createApp} from './server/app.js';
export default defineConfig({
 plugins:[{name:'miras-express-dev-api',configureServer(server){const api=createApp();server.middlewares.use((req,res,next)=>req.url?.startsWith('/api/')?api(req,res,next):next())}}],
 server:{allowedHosts:true},
 build:{outDir:'dist'}
});
