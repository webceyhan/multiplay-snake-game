import { WebSocketServer } from 'ws';

export const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', (ws) => {
        console.log('client connected');
        ws.on('message', (message) => {
            console.log(`received: ${message}`);
            ws.send(`echo: ${message}`);
        });
    });

    return wss;
};
