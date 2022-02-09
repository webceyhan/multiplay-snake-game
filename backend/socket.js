import { WebSocketServer } from 'ws';
import { createGame, FRAME_RATE } from './game/index.js';
import { makeId, broadcast, parseMessage, emit } from './utils.js';

export const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    // define game state
    let game = createGame();

    function broadcastState() {
        broadcast(wss, 'state', game.state);
    }

    function resetGame() {
        game = createGame();
        wss.clients.forEach((ws) => game.addPlayer(ws.id));
    }

    function joinGame(ws) {
        ws.id = makeId();
        game.addPlayer(ws.id);

        console.log('client joined: ' + ws.id);
        emit(ws, 'joined', ws.id);
        broadcastState();
    }

    function leaveGame(ws) {
        game.removePlayer(ws.id);

        console.log('client left: ' + ws.id);
        broadcastState();
    }

    function movePlayer(ws, key) {
        game.movePlayer(ws.id, key);
    }

    const startGame = () => {
        // reset game state
        resetGame();

        const gameLoop = setInterval(() => {
            try {
                game.loop();
            } catch (error) {
                clearInterval(gameLoop);
                console.log(error);
            }

            // broadcast state to all clients
            broadcastState();
        }, FRAME_RATE);
    };

    wss.on('connection', (ws) => {
        joinGame(ws);

        ws.on('close', () => leaveGame(ws));

        // listen for messages
        ws.on('message', (message) => {
            // parse message as event object
            const { event, data } = parseMessage(message);

            switch (event) {
                case 'start':
                    return startGame();
                case 'keydown':
                    return movePlayer(ws, data);
            }
        });
    });

    return wss;
};
