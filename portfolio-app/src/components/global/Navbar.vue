<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive state
const isSticky = ref(false)
const navbar = ref(null)

// Navigation items
const navItems = [
  { name: 'Kezdőlap', href: '#hero' },
  { name: 'Szolgáltatás', href: '#szolgaltatasok' },
  { name: 'Projektek', href: '#projektek' },
  { name: 'Kapcsolat', href: '#kapcsolat' },
]

// Scroll handler
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  // Trigger sticky navbar after scrolling 100px
  isSticky.value = scrollTop > 50
}

// Smooth scroll function
const smoothScroll = (href) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="relative">
    <!-- Navbar -->
    <nav
      :class="[
        'transition-all duration-500 ease-out z-50 font-jetbrains',
        isSticky
          ? 'fixed top-0 left-1/2 transform -translate-x-1/2 w-[95%] max-w-4xl bg-dark/95 backdrop-blur-md border border-primary/50 rounded-2xl shadow-2xl mt-4'
          : 'absolute top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-secondary/80 backdrop-blur-sm border border-gray-600/30 rounded-xl shadow-lg',
      ]"
      ref="navbar"
    >
      <div class="px-6 py-4">
        <div class="flex items-center justify-center space-x-8">
          <!-- Navigation Links -->
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            :class="[
              'relative text-sm font-medium transition-all duration-500 hover:text-primary group',
              isSticky ? 'text-white px-4' : 'text-light',
            ]"
            @click="smoothScroll(item.href)"
          >
            {{ item.name }}
            <!-- Hover underline effect -->
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/90 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
