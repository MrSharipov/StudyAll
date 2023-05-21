import http from 'http';
import fs from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8000;


const server = http.createServer(async (req, res)=> {
    const contentBuffer = await fs.readFile(__dirname + "/text.txt"); 

    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end(contentBuffer.toString("utf-8"));
});


server.listen(PORT, ()=> {
    console.log(`App is running port ${PORT}`)
})