<script setup>

const emit = defineEmits(['press']);

</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <button
      type="button"
      class="btn btn-primary btn-lg m-1"
      @click="emit('press', 'ArrowLeft')"
    >&larr;</button>

    <div class="d-flex flex-column">
      <button
        type="button"
        class="btn btn-primary btn-lg m-1"
        @click="emit('press', 'ArrowUp')"
      >&uarr;</button>
      <button
        type="button"
        class="btn btn-primary btn-lg m-1"
        @click.down="emit('press', 'ArrowDown')"
      >&darr;</button>
    </div>

    <button
      type="button"
      class="btn btn-primary btn-lg m-1"
      @click="emit('press', 'ArrowRight')"
    >&rarr;</button>
  </div>
</template>

