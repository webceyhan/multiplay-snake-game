<script setup>
import { onMounted, ref } from 'vue';
// import HelloWorld from './components/HelloWorld.vue'

// get canvas ref
const grid = ref();
const GRID_SIZE = 600;
const CELL_COUNT = 20;
const CELL_SIZE = GRID_SIZE / CELL_COUNT;



// define game state
const state = {
  player: {
    color: '#00f',
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

  const drawCell = ({ x, y }, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  const drawPlayer = ({ snake, color }) => {
    snake.forEach((cell) => drawCell(cell, color));
  }

  const drawGame = (state) => {
    drawPlayer(state.player);
  }

  drawGame(state);
});

</script>

<template>
  <div class="container text-center">
    <h1 class="display-4 py-3">Snake Game</h1>

    <canvas
      ref="grid"
      class="bg-secondary"
      :style="{ width: `${GRID_SIZE}px`, height: `${GRID_SIZE}px` }"
    ></canvas>
  </div>
</template>

