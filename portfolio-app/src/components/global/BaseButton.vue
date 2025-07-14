<template>
  <button
    class="px-8 py-4 border-2 border-primary cursor-pointer text-white rounded-2xl font-semibold duration-500 hover:bg-primary hover:border-black hover:text-black transition-colors"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['click'])

function handleClick(event) {
  emit('click', event)
}
</script>
