<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'

import { onMounted, ref } from 'vue';

// get canvas ref
const grid = ref();


onMounted(() => {
  // define canvas context in 2D
  const ctx = grid.value.getContext('2d');

});

</script>

<template>
  <div class="container text-center">
    <h1 class="display-4 py-3">Snake Game</h1>

    <canvas ref="grid" class="bg-secondary" style="width: 600px; height: 600px;"></canvas>
  </div>
</template>

