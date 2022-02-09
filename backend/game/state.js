import { CELL_COUNT, FOOD_COLOR, SNAKE_COLORS } from './constants.js';

export const createGame = () => {
    // define state
    const state = createState();

    return {
        state,

        addPlayer: (id) =>
            (state.players[id] = createPlayer(
                Object.keys(state.players).length
            )),

        removePlayer: (id) => delete state.players[id],

        movePlayer: (id, key) =>
            (state.players[id].velocity = keyToVelocity(key)),

        loop: () => {
            Object.entries(state.players).forEach(([id, player]) => {
                try {
                    loopPlayer(player, state);
                } catch (error) {
                    state.loser = id;
                    state.active = false;

                    throw 'Game Over';
                }
            });
        },
    };
};

const createState = () => ({
    players: {},
    food: createFood(),
    loser: null,
    active: false,
});

const createFood = () => ({
    color: FOOD_COLOR,
    position: randomPosition(),
});

const createPlayer = (index = 0) => ({
    color: SNAKE_COLORS[index],
    position: { x: 2 + index * 10, y: 10 },
    velocity: { x: 1, y: 0 },
    snake: [
        { x: 1 + index * 10, y: 10 },
        { x: 2 + index * 10, y: 10 },
    ],
});

const loopPlayer = ({ position, velocity, snake }, state) => {
    // move player position
    movePosition(position, velocity);

    // check if snake is out of bounds
    if (isOutOfBounds(position)) {
        throw 'player out of bounds';
    }

    // check if snake is eating itself
    if (snake.some((cell) => isOverlapping(cell, position))) {
        throw 'player ate itself';
    }

    // check if snake is eating food
    if (isOverlapping(position, state.food.position)) {
        // add new cell to snake
        snake.push({ ...position });

        // move one cell forward
        movePosition(position, velocity);

        // generate new food
        state.food = createFood();
    }

    // remove first, add to last of the snake
    snake.shift() && snake.push({ ...position });
};

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const random = (max) => Math.floor(Math.random() * max);

const randomPosition = () => ({
    x: random(CELL_COUNT),
    y: random(CELL_COUNT),
});

const isOutOfBounds = ({ x, y }) =>
    x < 0 || x >= CELL_COUNT || y < 0 || y >= CELL_COUNT;

const isOverlapping = (a, b) => a.x === b.x && a.y === b.y;

const movePosition = (position, velocity) => {
    position.x += velocity.x;
    position.y += velocity.y;
};

const keyToVelocity = (key) => {
    switch (key) {
        case 'ArrowUp':
            return { x: 0, y: -1 };
        case 'ArrowDown':
            return { x: 0, y: 1 };
        case 'ArrowLeft':
            return { x: -1, y: 0 };
        case 'ArrowRight':
            return { x: 1, y: 0 };
    }
};
