<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Palette, Smartphone, Search, HeadphonesIcon } from 'lucide-vue-next'
import BaseButton from '@/components/global/BaseButton.vue'

const servicesContainer = ref(null)
const isVisible = ref(false)
const animatedItems = ref([])

const services = [
  {
    icon: Palette,
    title: 'Egyedi webdesign',
    description:
      'Professzionális, személyre szabott arculat, amely tökéletesen illeszkedik a márkádhoz, és kitűnik a versenytársak közül. Modern, esztétikus megjelenés, ami első látásra megfogja a látogatókat és növeli a bizalmat.',
    delay: 0,
  },
  {
    icon: Smartphone,
    title: 'Reszponzív fejlesztés',
    description:
      'Teljesen mobilbarát weboldal, amely minden eszközön – legyen az telefon, tablet vagy asztali számítógép – gyorsan és hibátlanul jelenik meg. Optimalizált felhasználói élmény minden kijelzőn, hogy ne veszíts el egy látogatót sem.',
    delay: 400,
  },
  {
    icon: Search,
    title: 'SEO alapok',
    description:
      'Keresőoptimalizált struktúra, gyors betöltési sebesség és tiszta, hatékony kód, hogy weboldalad előrébb kerüljön a Google találati listáján. Minden elem úgy készül, hogy maximális organikus elérést biztosítson.',
    delay: 600,
  },
  {
    icon: HeadphonesIcon,
    title: 'Folyamatos támogatás',
    description:
      'Rugalmas karbantartási csomagok és villámgyors ügyfélszolgálat, hogy weboldalad mindig biztonságos, friss és jól működő maradjon. Nem hagyunk magadra – bármikor számíthatsz ránk.',
    delay: 800,
  },
]

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isVisible.value) {
      isVisible.value = true

      // Animate items with staggered delay
      services.forEach((service, index) => {
        setTimeout(() => {
          animatedItems.value[index] = true
        }, service.delay)
      })
    }
  })
}

const scrollToContact = () => {
  const contactSection = document.getElementById('kapcsolat')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

let observer

onMounted(() => {
  // Initialize animated items array
  animatedItems.value = new Array(services.length).fill(false)

  // Set up intersection observer
  observer = new IntersectionObserver(observerCallback, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  })

  if (servicesContainer.value) {
    observer.observe(servicesContainer.value)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section
    ref="servicesContainer"
    id="szolgaltatasok"
    class="scroll-mt-24 py-24 bg-gradient-to-b from-dark via-secondary/20 to-dark relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-8 md:px-16 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="space-y-4 transition-all duration-1000 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <h2 class="text-sm font-light tracking-wider text-light uppercase mb-4">
            SZOLGÁLTATÁSOK
          </h2>
          <h3 class="text-3xl sm:text-5xl font-bold font-jetbrains text-white leading-tight">
            Mit kínálunk
            <span class="text-primary hidden sm:inline-block">kis- és mikrovállalkozóknak?</span>
            <span class="text-primary sm:hidden">a vállalkozóknak?</span>
          </h3>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto animate-float">
        <div v-for="(service, index) in services" :key="index" class="group">
          <div
            class="relative p-8 rounded-2xl bg-gradient-to-br from-secondary/30 to-dark/50 border border-secondary/20 transition-all duration-500 hover:border-primary/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
            :class="
              animatedItems[index]
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            "
          >
            <!-- Icon with animated background -->
            <div class="relative mb-6">
              <div
                class="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500 scale-150"
              ></div>
              <div
                class="relative bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-500"
              >
                <component
                  :is="service.icon"
                  class="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-4">
              <h4
                class="text-xl sm:text-2xl font-bold font-jetbrains text-white group-hover:text-primary transition-colors duration-300"
              >
                {{ service.title }}
              </h4>
              <p
                class="text-light leading-relaxed text-base sm:text-lg group-hover:text-white transition-colors duration-300"
              >
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div
        class="text-center mt-16 transition-all duration-1000 ease-out delay-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <p class="text-lg sm:text-xl text-light mb-8 max-w-2xl mx-auto">
          Minden szolgáltatásunk egy cél felé irányul:
          <span class="text-primary font-semibold"
            >hogy a weboldalad valódi eredményeket hozzon</span
          >
        </p>
        <BaseButton @click="scrollToContact">Beszéljük meg a részleteket!</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 6s ease-in-out infinite;
  animation-delay: 3s;
}
</style>
