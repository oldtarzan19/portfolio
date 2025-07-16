<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="px-8 py-4 border-2 border-primary cursor-pointer text-white rounded-2xl font-semibold duration-500 hover:bg-primary hover:border-black hover:text-black transition-colors inline-flex items-center gap-2"
    target="_blank"
    rel="noopener noreferrer"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  href: String, // új prop a linkhez
})
const emit = defineEmits(['click'])

function handleClick(event) {
  // ha link, kattintáskor hagyjuk, hogy navigáljon
  if (!props.href) {
    emit('click', event)
  }
}
</script>
