import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import express from 'express';

// define constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const wwwDir = path.join(__dirname, '../dist');
const wwwIndex = path.join(wwwDir, 'index.html');

export const createHttpServer = (port) => {
    // create app
    const app = express();
    const server = createServer(app);
    const hostname = '0.0.0.0';

    // serve static client files
    app.use(express.static(wwwDir));

    // define catch-all route for app
    app.get('*', (req, res) => res.sendFile(wwwIndex));

    // start listening
    server.listen(port, hostname, () =>
        console.log(`server started: http://${hostname}:${port}`)
    );

    return server;
};
