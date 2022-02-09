<script setup>
import { onMounted, ref, watch } from 'vue';
import { createGameContext, GRID_SIZE, useGame } from './game';

// get canvas ref
const canvas = ref();

// get state object
const { state, active, message, emit } = useGame();

function onStart() {
  emit('start')
}

onMounted(() => {
  // initialize canvas context
  const gameCtx = createGameContext(canvas.value);

  // watch for changes in state
  watch(state, () => gameCtx.draw(state.value));

  // watch for keydown events
  document.addEventListener('keydown', ({ key }) => emit('keydown', key));
});

</script>

<template>
  <div class="container text-center">
    <div class="d-flex justify-content-between align-items-center px-5 py-3">
      <h1 class="display-4">Snake Game</h1>

      <button
        v-if="!active"
        type="button"
        class="btn btn-primary btn-lg"
        @click="onStart"
      >Start Game</button>
    </div>

    <canvas
      ref="canvas"
      class="bg-dark"
      :style="{ width: `${GRID_SIZE}px`, height: `${GRID_SIZE}px` }"
    ></canvas>

    <h1 v-if="message" class="display-6">{{ message }}</h1>
  </div>
</template>

