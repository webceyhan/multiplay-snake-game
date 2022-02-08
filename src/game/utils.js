import { CELL_COUNT, FOOD_COLOR, SNAKE_COLOR } from './constants';

export const random = (max) => Math.floor(Math.random() * max);

export const randomPosition = () => ({
    x: random(CELL_COUNT),
    y: random(CELL_COUNT),
});

export const isOutOfBounds = ({ x, y }) =>
    x < 0 || x >= CELL_COUNT || y < 0 || y >= CELL_COUNT;

export const isOverlapping = (a, b) => a.x === b.x && a.y === b.y;

export const movePosition = (position, velocity) => {
    position.x += velocity.x;
    position.y += velocity.y;
};

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

export const keyToVelocity = (key) => {
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
