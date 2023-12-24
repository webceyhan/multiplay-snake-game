import  { createHttpServer } from './http.js'
import  { createSocketServer } from './socket.js'

const PORT = process.env.PORT || 3001;

// start servers on same port
const server = createHttpServer(PORT);
const wss = createSocketServer(server);
