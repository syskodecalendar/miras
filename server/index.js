import {createApp} from './app.js';
const port=Number(process.env.PORT)||3001;
createApp().listen(port,'0.0.0.0',()=>console.log(`Syskode Technologies demo Express API: http://localhost:${port} (in-memory data; demo role selection, not production authentication)`));
