import { reactive } from 'vue';
import { FRAME_RATE } from './constants';
import {
    createFood,
    createPlayer,
    isOutOfBounds,
    isOverlapping,
    movePosition,
    keyToVelocity,
} from './utils';

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

const startGame = () => {
    const gameLoop = setInterval(() => {
        try {
            movePlayer(state.player);
        } catch (error) {
            clearInterval(gameLoop);
            console.log(error);
        }
    }, FRAME_RATE);
};

const emitKeyDown = ({ key }) => (state.player.velocity = keyToVelocity(key));

export const useGame = () => {
    return { state, startGame, emitKeyDown };
};
