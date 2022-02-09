<script setup>
import { onMounted, ref, watch } from 'vue';
import { createGameContext, GRID_SIZE, useGame } from './game';
import VirtualKeyboard from './components/VirtualKeyboard.vue';

// get canvas ref
const canvas = ref();

// get state object
const { state, active, message, emit } = useGame();

const isMobile = () => {
  const ua = navigator.userAgent.toLowerCase();
  const iPad = ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;
  return iPad || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
}

function onStart() {
  emit('start')
}

function onKeydown(key) {
  emit('keydown', key);
}

onMounted(() => {
  // initialize canvas context
  const gameCtx = createGameContext(canvas.value);

  // watch for changes in state
  watch(state, () => gameCtx.draw(state.value));

  // watch for keydown events
  document.addEventListener('keydown', ({ key }) => onKeydown(key));
});

</script>

<template>
  <div class="container">
    <header class="text-center mb-4">
      <h1 class="display-4">Snake Game</h1>
    </header>

    <section class="d-flex justify-content-center">
      <button
        v-if="!active"
        type="button"
        class="btn btn-primary btn-lg mb-4"
        @click="onStart"
      >Start Game</button>

      <virtual-keyboard v-if="active && isMobile()" class="mb-4" @press="onKeydown" />
    </section>

    <section class="d-flex flex-column justify-content-center align-items-center">
      <canvas
        ref="canvas"
        class="bg-dark"
        :style="{ width: `${GRID_SIZE}px`, height: `${GRID_SIZE}px` }"
      ></canvas>

      <h1 v-if="message" class="display-6 mt-2">{{ message }}</h1>
    </section>
  </div>
</template>

