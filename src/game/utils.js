import { CELL_COUNT } from './constants';

export const random = (max) => Math.floor(Math.random() * max);

export const randomPosition = () => ({
    x: random(CELL_COUNT),
    y: random(CELL_COUNT),
});

export const isOutOfBounds = ({ x, y }) =>
    x < 0 || x >= CELL_COUNT || y < 0 || y >= CELL_COUNT;

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
