import { GRID_SIZE, CELL_SIZE, GRID_COLOR, SNAKE_COLOR } from './constants';
import { createFood, isOutOfBounds, keyToVelocity,  } from './utils';
export { GRID_SIZE } from './constants';

// define game state
const state = {
    player: {
        color: SNAKE_COLOR,
        position: { x: 3, y: 10 },
        velocity: { x: 1, y: 0 },
        snake: [
            { x: 1, y: 10 },
            { x: 2, y: 10 },
            { x: 3, y: 10 },
        ],
    },
    food: createFood(),
};

const movePlayer = ({ position, velocity, snake }) => {
    position.x += velocity.x;
    position.y += velocity.y;

    // check if snake is out of bounds
    if (isOutOfBounds(position)) {
        throw 'player out of bounds';
    }

    // check if snake is eating itself
    if (snake.some((cell) => cell.x === position.x && cell.y === position.y)) {
        throw 'player ate itself';
    }

    // check if snake is eating food
    if (
        position.x === state.food.position.x &&
        position.y === state.food.position.y
    ) {
        // add new cell to snake
        snake.push({ ...position });

        // move one cell forward
        position.x += velocity.x;
        position.y += velocity.y;

        // generate new food
        state.food = createFood();
    }

    // add new cell to the end of the snake
    snake.push({ ...position });
    // remove old cell from the beginning of the snake
    snake.shift();
};

/**
 *
 * @param {HTMLCanvasElement} canvas
 */
export const createGame = (canvas) => {
    // define grid size (mandatory for canvas)
    canvas.width = canvas.height = GRID_SIZE;

    // define canvas context in 2D
    const ctx = canvas.getContext('2d');

    const drawCell = ({ x, y, w, h }, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            w || CELL_SIZE,
            h || CELL_SIZE
        );
    };

    const drawPlayer = ({ snake, color }) => {
        snake.forEach((cell) => drawCell(cell, color));
    };

    const drawFood = ({ position, color }) => {
        drawCell(position, color);
    };

    const drawGame = (state) => {
        // draw canvas to clear for next frame
        drawCell({ x: 0, y: 0, w: GRID_SIZE, h: GRID_SIZE }, GRID_COLOR);

        // draw food
        drawFood(state.food);

        // draw player
        drawPlayer(state.player);
    };

    const loopGame = (state) => {
        movePlayer(state.player);
        drawGame(state);
    };

    const gameLoop = setInterval(() => {
        try {
            loopGame(state);
        } catch (error) {
            clearInterval(gameLoop);
            console.log(error);
        }
    }, 500);

    // add keydown listener
    document.addEventListener(
        'keydown',
        ({ key }) => (state.player.velocity = keyToVelocity(key))
    );
};
