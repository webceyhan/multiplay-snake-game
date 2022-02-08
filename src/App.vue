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

// define game state
const state = {
  player: {
    color: SNAKE_COLOR,
    position: { x: 2, y: 10 },
    velocity: { x: 1, y: 0 },
    snake: [
      { x: 1, y: 10 },
      { x: 2, y: 10 },
    ]
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

  const drawGame = (state) => {
    // draw canvas to clear for next frame
    drawCell({ x: 0, y: 0, w: GRID_SIZE, h: GRID_SIZE }, GRID_COLOR);

    // draw player
    drawPlayer(state.player);
  }

  const movePlayer = ({ position, velocity, snake }) => {
    position.x += velocity.x;
    position.y += velocity.y;

    // add new cell to the end of the snake
    snake.push({ ...position });
    // remove old cell from the beginning of the snake
    snake.shift();
  }

  const loopGame = (state) => {
    movePlayer(state.player);
    drawGame(state);
  }

  const gameLoop = setInterval(() => {
    loopGame(state);
  }, 1000);
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

