import { WebSocketServer } from 'ws';
import * as game from './game/index.js';
import { makeId, emit, broadcast, parseMessage } from './utils.js';

export const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    // define game state
    let state = game.createState();

    function resetGame() {
        state = game.createState();
        wss.clients.forEach((ws) => {
            state.players[ws.id] = game.createPlayer();
        });
    }

    function joinGame(ws) {
        ws.id = makeId();
        state.players[ws.id] = game.createPlayer();
        console.log('client joined: ' + ws.id);
        broadcast(wss, 'update', state);
    }

    function leaveGame(ws) {
        delete state.players[ws.id];
        console.log('client left: ' + ws.id);
        broadcast(wss, 'update', state);
    }

    function makeMove(ws, key) {
        game.movePlayer(ws.id, key, state);
    }

    const startGame = () => {
        // reset game state
        resetGame();

        const gameLoop = setInterval(() => {
            try {
                game.loopPlayers(state);
            } catch (error) {
                clearInterval(gameLoop);
                state.active = false;
                state.message = 'Game Over: ' + error;
            }

            // broadcast state to all clients
            broadcast(wss, 'update', state);
        }, game.FRAME_RATE);
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
                    return makeMove(ws, data);
            }
        });
    });

    return wss;
};
