import  { createHttpServer } from './http.js'
import  { createSocketServer } from './socket/server.js'

const PORT = process.env.PORT || 8080;

// start servers on same port
const server = createHttpServer(PORT);
const wss = createSocketServer(server);