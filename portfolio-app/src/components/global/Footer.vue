<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="bg-dark border-t border-secondary/20 text-white text-center py-6">
    <div class="relative z-10 space-y-3">
      <!-- Legal Links -->
      <div class="flex justify-center items-center space-x-4 text-sm">
        <a
          href="/impresszum"
          class="text-light hover:text-primary transition-colors duration-300 hover:underline"
        >
          Impresszum
        </a>
        <span class="text-secondary">|</span>
        <a
          href="/adatvedelem"
          class="text-light hover:text-primary transition-colors duration-300 hover:underline"
        >
          Adatvédelmi nyilatkozat
        </a>
      </div>

      <!-- Copyright -->
      <p class="text-light text-sm">&copy; {{ currentYear }} Minden jog fenntartva</p>

      <!-- Created by -->
      <p class="text-white font-jetbrains text-sm">
        Készítette
        <span
          class="text-primary hover:text-primary/80 transition-colors duration-300 cursor-default"
        >
          Zsofenszki Kristóf
        </span>
      </p>
    </div>
  </div>
</template>
