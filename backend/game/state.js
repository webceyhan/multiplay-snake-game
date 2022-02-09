import {
    GRID_SIZE,
    GRID_COLOR,
    CELL_SIZE,
    CELL_COUNT,
    FOOD_COLOR,
    SNAKE_COLOR,
} from './constants.js';

export const createState = () => ({
    players: {},
    food: createFood(),
    grid: {
        size: GRID_SIZE,
        color: GRID_COLOR,
    },
    cell: {
        size: CELL_SIZE,
        count: CELL_COUNT,
    },
});

export const createFood = () => ({
    color: FOOD_COLOR,
    position: randomPosition(),
});

export const createPlayer = () => ({
    color: SNAKE_COLOR,
    position: { x: 2, y: 10 },
    velocity: { x: 1, y: 0 },
    snake: [
        { x: 1, y: 10 },
        { x: 2, y: 10 },
    ],
});

export const movePlayer = (id, key, state) =>
    (state.players[id].velocity = keyToVelocity(key));

export const loopPlayers = (state) => {
    Object.values(state.players).forEach((player) => loopPlayer(player, state));
};

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
