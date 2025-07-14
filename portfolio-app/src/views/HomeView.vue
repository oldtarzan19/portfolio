<script setup>
import Hero from '@/components/Hero.vue'
import Services from '@/components/Services.vue'


</script>

<template>
  <main>
    <div class="min-h-screen bg-dark text-white">
      <!-- Hero Section -->
      <section id="hero" class="h-screen flex items-center justify-center">
       <Hero/>
      </section>

      <!-- About Section -->
      <section id="service">
        <Services/>
      </section>

      <!-- Projects Section -->
      <section id="projektek" class="min-h-screen py-20 px-8 bg-gray-900">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold mb-8 text-center">Projektek</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="bg-gray-700/50 p-6 rounded-xl hover:bg-gray-700/70 transition-colors">
              <h3 class="text-xl font-semibold mb-4">Projekt {{ i }}</h3>
              <p class="text-gray-300 mb-4">Projekt leírás itt...</p>
              <div class="flex space-x-2">
                <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Vue.js</span>
                <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Node.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section id="tapasztalat" class="min-h-screen py-20 px-8 bg-gray-800">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold mb-8 text-center">Tapasztalat</h2>
          <div class="space-y-8">
            <div v-for="i in 3" :key="i" class="bg-gray-700/50 p-6 rounded-xl">
              <h3 class="text-xl font-semibold mb-2">Senior Developer</h3>
              <p class="text-blue-400 mb-4">Tech Company {{ i }} • 2022-2024</p>
              <p class="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="kapcsolat" class="min-h-screen py-20 px-8 bg-gray-900">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold mb-8">Kapcsolat</h2>
          <p class="text-xl text-gray-300 mb-8">Keress bátran, ha van egy érdekes projekt!</p>
          <div class="flex justify-center space-x-6">
            <a href="mailto:email@example.com" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Email
            </a>
            <a href="https://linkedin.com" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
