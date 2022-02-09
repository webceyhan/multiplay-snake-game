export const makeId = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

export const parseMessage = (message) => JSON.parse(message.toString());

export const emit = (ws, event, data) =>
    ws.send(JSON.stringify({ event, data }));

export const broadcast = (wss, event, data) =>
    wss.clients.forEach((client) => emit(client, event, data));
