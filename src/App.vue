<script setup>
import { onMounted, ref, watch } from 'vue';
import { createGameContext, GRID_SIZE, useGame } from './game';

// get state object
const game = useGame();

function onStart() {
  game.emit('start')
}

onMounted(() => {
  // get canvas ref
  const canvas = ref();

  // initialize canvas context
  const gameCtx = createGameContext(canvas.value);

  // watch for changes in state
  watch(game.state, () => gameCtx.draw(game.state.value));

  // watch for keydown events
  document.addEventListener('keydown', ({ key }) => game.emit('keydown', key));

});

</script>

<template>
  <div class="container text-center">
    <h1 class="display-4 py-3">Snake Game</h1>

    <canvas
      ref="canvas"
      class="bg-dark"
      :style="{ width: `${GRID_SIZE}px`, height: `${GRID_SIZE}px` }"
    ></canvas>

    <button type="button" class="btn btn-primary btn-lg" @click="onStart">Start Game</button>
  </div>
</template>

