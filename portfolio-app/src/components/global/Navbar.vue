<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

// Állapotok
const isSticky = ref(false)
const isMobileMenuOpen = ref(false)
const currentYear = new Date().getFullYear()

// Navigációs elemek
const navItems = [
  { name: 'Kezdőlap', href: '#hero' },
  { name: 'Szolgáltatás', href: '#szolgaltatasok' },
  { name: 'Projektek', href: '#projektek' },
  { name: 'Kapcsolat', href: '#kapcsolat' },
]

// Scroll-figyelő a sticky effekthez
const handleScroll = () => {
  isSticky.value = window.pageYOffset > 50
}

// Smooth scroll és mobil menü csukása kattintás után
const smoothScroll = (href) => {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  isMobileMenuOpen.value = false
}

// Mobil menü nyit-zár
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Kívülre kattintáskor zárjuk a menüt
const closeMobileMenu = (e) => {
  if (!e.target.closest('.mobile-menu-container') && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Scroll és kattintás események feliratkozás
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closeMobileMenu)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeMobileMenu)
})

// Body scroll-lock amikor a sidebar nyitva van
watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <!-- DESKTOP NAVBAR -->
  <nav
    class="hidden md:flex transition-all duration-500 ease-out z-50 font-jetbrains"
    :class="
      isSticky
        ? 'fixed top-0 left-1/2 transform -translate-x-1/2 w-[95%] max-w-4xl bg-dark/95 backdrop-blur-md border border-primary/50 rounded-2xl shadow-2xl mt-4'
        : 'absolute top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-secondary/80 backdrop-blur-sm border border-gray-600/30 rounded-xl shadow-lg'
    "
  >
    <div class="px-6 py-4 w-full flex items-center justify-center space-x-8">
      <a
        v-for="item in navItems"
        :key="item.name"
        href="#"
        @click.prevent="smoothScroll(item.href)"
        class="relative text-sm font-medium transition-all duration-500 hover:text-primary group"
        :class="isSticky ? 'text-white px-4' : 'text-light'"
      >
        {{ item.name }}
        <span
          class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/90 transition-all duration-300 group-hover:w-full"
        ></span>
      </a>
    </div>
  </nav>

  <!-- MOBILE HAMBURGER GOMB -->
  <button
    class="md:hidden fixed top-5 right-4 z-50 flex flex-col items-center justify-center w-8 h-8 space-y-1 mobile-menu-container text-primary"
    @click="toggleMobileMenu"
  >
    <span
      :class="[
        'w-6 h-0.5 bg-current transition-all duration-300',
        isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '',
      ]"
    ></span>
    <span
      :class="[
        'w-6 h-0.5 bg-current transition-all duration-300',
        isMobileMenuOpen ? 'opacity-0' : '',
      ]"
    ></span>
    <span
      :class="[
        'w-6 h-0.5 bg-current transition-all duration-300',
        isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : '',
      ]"
    ></span>
  </button>

  <!-- MOBILE SIDEBAR -->
  <div
    :class="[
      'fixed inset-0 z-40 transition-opacity duration-300 md:hidden',
      isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0',
    ]"
  >
    <!-- Háttér -->
    <div
      class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      :class="isMobileMenuOpen ? 'opacity-100' : 'opacity-0'"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Menüsáv -->
    <aside
      class="absolute right-0 top-0 h-full w-64 bg-dark backdrop-blur-md border-l border-primary/50 shadow-2xl transform transition-transform duration-300 ease-out mobile-menu-container"
      :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Navigáció -->
      <nav class="py-6">
        <a
          v-for="item in navItems"
          :key="item.name"
          href="#"
          @click.prevent="smoothScroll(item.href)"
          class="block px-6 py-4 text-light font-medium transition-all duration-200 hover:text-primary hover:bg-primary/10 border-l-4 border-transparent hover:border-primary"
        >
          {{ item.name }}
        </a>
      </nav>

      <!-- Lábléc -->
      <footer class="absolute bottom-0 left-0 right-0 p-6 border-t border-primary/20">
        <p class="text-sm text-light/60 text-center">&copy; {{ currentYear }} Webfejlesztomlesz</p>
      </footer>
    </aside>
  </div>
</template>

<style scoped></style>
