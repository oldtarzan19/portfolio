<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseButton from '@/components/global/BaseButton.vue'
import Logo from '@/assets/logo_transparent.png'

const scrollToContact = () => {
  const contactSection = document.getElementById('kapcsolat')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const labels = [
  'kisvállalkozásoknak',
  'masszőröknek',
  'fodrászoknak',
  'vállalkozóknak',
  'éttermeknek',
  'kávézóknak',
  'szépségszalonoknak',
  'autószerelőknek',
  'állatorvosoknak',
  'ingatlanosoknak',
  'könyvelőknek',
  'coach-oknak',
  'tréningcégeknek',
  'nyelviskoláknak',
  'esküvőszervezőknek',
  'fotósoknak',
  'rendezvényszervezőknek',
  'oktatóknak',
  'webshopoknak',
  'műhelyeknek',
  'szabadúszóknak',
  'művészeknek',
  'ingatlanügynökségeknek',
  'szállásoknak',
]

const currentIndex = ref(0)
const currentLabel = ref(labels[0])
const show = ref(true)
let intervalId

onMounted(() => {
  intervalId = setInterval(() => {
    // először fade‐out
    show.value = false
    setTimeout(() => {
      // update, majd fade‐in
      currentIndex.value = (currentIndex.value + 1) % labels.length
      currentLabel.value = labels[currentIndex.value]
      show.value = true
    }, 900) // duration-500 értéke
  }, 3000)
})
onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div
    class="text-center flex flex-col md:flex-row justify-between w-full bg-gradient-to-r from-dark animate-glow"
  >
    <div
      class="flex flex-col items-center md:items-start px-6 md:pl-16 justify-center h-screen w-full text-white space-y-5"
    >
      <!-- Welcome text -->
      <div class="text-sm font-light tracking-wider text-light uppercase">
        KÖNNYŰ, GYORS ÉS MEGBÍZHATÓ
      </div>

      <!-- Main heading -->
      <div class="space-y-3">
        <div class="text-left">
          <h1 class="text-4xl sm:text-6xl font-bold leading-tight space-x-3">
            <span class="font-jetbrains">Weboldal</span>
            <transition
              enter-active-class="transition-opacity duration-500"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-500"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-if="show" :key="currentLabel" class="text-light text-2xl hidden sm:inline">
                {{ currentLabel }}
              </span>
            </transition>
          </h1>
          <h2 class="text-3xl sm:text-5xl font-bold font-jetbrains leading-tight">
            <span class="text-primary">kedvező, átlátható áron</span>
          </h2>
        </div>

        <!-- Description -->
        <p class="text-base sm:text-lg text-gray-300 leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
          Egyedi dizájn, mobilbarát kialakítás és folyamatos támogatás, hogy weboldalad ne csak szép
          legyen, de bevételt is termeljen.
        </p>

        <!-- Buttons -->
        <div class="flex pt-4">
          <BaseButton @click="scrollToContact"> Indítsuk el a weboldalad! </BaseButton>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center h-screen w-full animate-float mt-8 md:mt-0">
      <img :src="Logo" alt="Logo" class="w-3/4 sm:w-2/3 lg:w-3/4 h-auto object-cover rounded-lg" />
    </div>
  </div>
</template>

<style scoped>
@keyframes glow {
  0%,
  100% {
    --tw-gradient-to: #14213d;
  }
  66% {
    --tw-gradient-to: #1c3d85;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-glow {
  animation: glow 6s infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
