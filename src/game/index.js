import { reactive, watch } from 'vue';
import { GRID_SIZE, CELL_SIZE, GRID_COLOR } from './constants';
import {
    createFood,
    createPlayer,
    isOutOfBounds,
    isOverlapping,
    keyToVelocity,
    movePosition,
} from './utils';
export { GRID_SIZE } from './constants';

// define game state
const state = reactive({
    player: createPlayer(),
    food: createFood(),
});

const movePlayer = ({ position, velocity, snake }) => {
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

const gameLoop = setInterval(() => {
    try {
        movePlayer(state.player);
    } catch (error) {
        clearInterval(gameLoop);
        console.log(error);
    }
}, 500);

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

    // watch for changes in state
    watch(state, () => drawGame(state));

    // watch for keydown events
    document.addEventListener(
        'keydown',
        ({ key }) => (state.player.velocity = keyToVelocity(key))
    );
};
