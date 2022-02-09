import { GRID_SIZE, CELL_SIZE, GRID_COLOR } from './constants';

/**
 * @param {HTMLCanvasElement} canvas
 */
export const createGameContext = (canvas) => {
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

    const draw = ({ players, food }) => {
        // draw canvas to clear for next frame
        drawCell({ x: 0, y: 0, w: GRID_SIZE, h: GRID_SIZE }, GRID_COLOR);

        // draw players
        Object.values(players).forEach((player) => drawPlayer(player));

        // draw food
        drawFood(food);
    };

    return { draw };
};
