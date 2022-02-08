<script setup>
import { onMounted, ref } from 'vue';
import { createGame, GRID_SIZE } from './game';


// get canvas ref
const canvas = ref();

onMounted(() => createGame(canvas.value));

</script>

<template>
  <div class="container text-center">
    <h1 class="display-4 py-3">Snake Game</h1>

    <canvas
      ref="canvas"
      class="bg-dark"
      :style="{ width: `${GRID_SIZE}px`, height: `${GRID_SIZE}px` }"
    ></canvas>
  </div>
</template>

