<script setup>
import { onMounted, ref } from 'vue';
// import HelloWorld from './components/HelloWorld.vue'

// define Bootstrap theme colors
const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
};

// get canvas ref
const grid = ref();
const GRID_SIZE = 600;
const CELL_COUNT = 20;
const CELL_SIZE = GRID_SIZE / CELL_COUNT;
const GRID_COLOR = colors.dark;
const SNAKE_COLOR = colors.primary;
const FOOD_COLOR = colors.success;

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
    ]
  },
  food: {
    color: FOOD_COLOR,
    position: { x: 10, y: 10 },
  },
};

onMounted(() => {
  // define grid size (mandatory for canvas)
  grid.value.width = grid.value.height = GRID_SIZE;

  // define canvas context in 2D
  /** @var {CanvasRenderingContext2D} */
  const ctx = grid.value.getContext('2d');

  const drawCell = ({ x, y, w, h }, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, w || CELL_SIZE, h || CELL_SIZE);
  }

  const drawPlayer = ({ snake, color }) => {
    snake.forEach((cell) => drawCell(cell, color));
  }

  const drawFood = ({ position, color }) => {
    drawCell(position, color);
  }

  const drawGame = (state) => {
    // draw canvas to clear for next frame
    drawCell({ x: 0, y: 0, w: GRID_SIZE, h: GRID_SIZE }, GRID_COLOR);

    // draw food
    drawFood(state.food);

    // draw player
    drawPlayer(state.player);
  }

  const movePlayer = ({ position, velocity, snake }) => {
    position.x += velocity.x;
    position.y += velocity.y;

    // check if snake is out of bounds
    if (position.x < 0 || position.x >= CELL_COUNT || position.y < 0 || position.y >= CELL_COUNT) {
      throw 'player out of bounds';
    }

    // check if snake is eating itself
    if (snake.some((cell) => cell.x === position.x && cell.y === position.y)) {
      throw 'player ate itself';
    }

    // check if snake is eating food
    if (position.x === state.food.position.x && position.y === state.food.position.y) {
      // add new cell to snake
      snake.push({ x: position.x, y: position.y });

      // generate new food
      state.food = generateRandomFood();
    }

    // add new cell to the end of the snake
    snake.push({ ...position });
    // remove old cell from the beginning of the snake
    snake.shift();
  }

  const generateRandomFood = () => {
    const x = Math.floor(Math.random() * CELL_COUNT);
    const y = Math.floor(Math.random() * CELL_COUNT);

    return {
      position: { x, y },
      color: FOOD_COLOR,
    };
  }

  const loopGame = (state) => {
    movePlayer(state.player);
    drawGame(state);
  }

  const gameLoop = setInterval(() => {
    try {
      loopGame(state);
    } catch (error) {
      clearInterval(gameLoop);
      console.log(error);
    }
  }, 500);


  // add keydown listener
  document.addEventListener('keydown', ({ key }) => {
    switch (key) {
      case 'ArrowUp':
        state.player.velocity.y = -1;
        state.player.velocity.x = 0;
        break;
      case 'ArrowDown':
        state.player.velocity.y = 1;
        state.player.velocity.x = 0;
        break;
      case 'ArrowLeft':
        state.player.velocity.y = 0;
        state.player.velocity.x = -1;
        break;
      case 'ArrowRight':
        state.player.velocity.y = 0;
        state.player.velocity.x = 1;
        break;
    }
  });

});

</script>

<template>
  <div class="container text-center">
    <h1 class="display-4 py-3">Snake Game</h1>

    <canvas
      ref="grid"
      class="bg-dark"
      :style="{ width: `${GRID_SIZE}px`, height: `${GRID_SIZE}px` }"
    ></canvas>
  </div>
</template>

