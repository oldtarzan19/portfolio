<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/global/Navbar.vue'
import Footer from '@/components/global/Footer.vue'
</script>

<template>
  <header>
      <Navbar />
  </header>

  <RouterView/>

  <footer>
    <Footer/>
  </footer>
</template>

<style scoped>

</style>
