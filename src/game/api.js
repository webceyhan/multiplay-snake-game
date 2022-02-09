import { ref, computed } from 'vue';

// define environment vars
const IS_DEV = import.meta.env.DEV;
const HOST_DEV = 'ws://localhost:8080';
const HOST_PROD = location.origin.replace(/^http/, 'ws');
const SOCKET_URL = IS_DEV ? HOST_DEV : HOST_PROD;

// define internal state
const id = ref(null);
const state = ref({});

// define socket
const socket = new WebSocket(SOCKET_URL);

// define emit helper
const emit = (event, data) => socket.send(JSON.stringify({ event, data }));

// define event handlers
socket.onopen = () => console.log('socket open');

socket.onmessage = (raw) => {
    // parse message as event, data
    const { event, data } = JSON.parse(raw.data);

    switch (event) {
        case 'joined':
            id.value = data;
            break;

        case 'state':
            state.value = data;
            break;
    }
};

export const useGame = () => {
    return {
        id,
        state,
        active: computed(() => state.value.active),
        message: computed(() => {
            // no message if game is active
            if (!state.value.loser) return null;

            const lost = state.value.loser === id.value;

            return lost ? 'You lost!' : 'You won!';
        }),
        emit,
    };
};
