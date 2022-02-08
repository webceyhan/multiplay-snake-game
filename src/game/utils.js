export const random = (max) => Math.floor(Math.random() * max);

export const randomPosition = (max) => ({ x: random(max), y: random(max) });

export const isOutOfBounds = ({ x, y }, max) =>
    x < 0 || x >= max || y < 0 || y >= max;

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
