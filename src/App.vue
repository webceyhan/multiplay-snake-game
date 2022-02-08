<script setup>
import { onMounted, ref, watch } from 'vue';
import { createGameContext, useGame, GRID_SIZE } from './game';

// get canvas ref
const canvas = ref();

// get state object
const game = useGame();

onMounted(() => {
  // create game
  const gameCtx = createGameContext(canvas.value);

  // watch for changes in state
  watch(game.state, () => gameCtx.draw(game.state));

  // watch for keydown events
  document.addEventListener('keydown', game.emitKeyDown);

  game.startGame();

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
  </div>
</template>

