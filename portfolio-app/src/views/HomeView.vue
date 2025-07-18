<script setup>
import Hero from '@/components/Hero.vue'
import Services from '@/components/Services.vue'
import Projects from '@/components/Projects.vue'
import Contact from '@/components/Contact.vue'
import Navbar from '@/components/global/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="min-h-screen bg-dark text-white">
      <!-- Hero Section -->
      <section id="hero" class="h-screen flex items-center justify-center">
        <Hero />
      </section>

      <!-- About Section -->
      <section id="szolgaltatasok">
        <Services />
      </section>

      <!-- Projects Section -->
      <section id="projektek">
        <Projects />
      </section>

      <!-- Contact Section -->
      <section id="kapcsolat">
        <Contact />
      </section>
    </div>
  </main>
</template>
