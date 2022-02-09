import { WebSocketServer } from 'ws';
import * as game from './game/index.js';
import { makeId, emit, broadcast } from './utils.js';

export const createSocketServer = (httpServer) => {
    // create websocket server
    const wss = new WebSocketServer({ server: httpServer });

    // define game state
    const state = game.createState();

    const startGame = () => {
        const gameLoop = setInterval(() => {
            try {
                game.loopPlayers(state);
                broadcast(wss, 'update', state);
            } catch (error) {
                clearInterval(gameLoop);
                console.log(error);
            }
        }, game.FRAME_RATE);
    };

    wss.on('connection', (ws) => {
        // assign client id
        ws.id = makeId();
        console.log('client connected: ' + ws.id);

        // add client to state
        state.players[ws.id] = game.createPlayer();

        // listen for messages
        ws.on('message', (message) => {
            // parse message as event object
            const { event, data } = JSON.parse(message.toString());

            switch (event) {
                case 'start':
                    startGame();
                    break;

                case 'keydown':
                    game.movePlayer(ws.id, data, state);
                    break;
            }
        });
    });

    return wss;
};
