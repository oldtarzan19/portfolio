<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
  'egyéni vállalkozóknak',
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
  'építőipari cégeknek',
  'szállásoknak',
  'turisztikai szolgáltatóknak',
  'kis boltoknak',
  'online szolgáltatóknak',
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
    }, 500) // duration-500 értéke
  }, 3000)
})
onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div
    class="text-center flex flex-row justify-between w-full bg-gradient-to-r from-dark to-primary/30 animate-glow"
  >
    <div
      class="flex flex-col items-start pl-16 justify-center h-screen w-full text-white space-y-5"
    >
      <!-- Welcome text -->
      <div class="text-sm font-light tracking-wider text-light uppercase">
        KÖNNYŰ, GYORS ÉS MEGBÍZHATÓ
      </div>

      <!-- Main heading -->
      <div class="space-y-3">
        <div class="text-left">
          <h1 class="text-6xl font-bold leading-tight flex flex-col md:flex-row md:space-x-3">
            <span class="font-jetbrains">Weboldal</span>
            <transition
              enter-active-class="transition-opacity duration-500"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-500"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span
                v-if="show"
                :key="currentLabel"
                class="text-light text-2xl inline-block whitespace-nowrap"
              >
                {{ currentLabel }}
              </span>
            </transition>
          </h1>
          <h2 class="text-5xl font-bold font-jetbrains leading-tight">
            <span class="text-primary">kedvező, átlátható áron</span>
          </h2>
        </div>

        <!-- Description -->
        <p class="text-lg text-gray-300 leading-relaxed max-w-md text-left">
          Egyedi dizájn, mobilbarát kialakítás és folyamatos támogatás, hogy weboldalad ne csak szép
          legyen, de bevételt is termeljen.
        </p>

        <!-- Buttons -->
        <div class="flex pt-4">
          <button
            class="px-8 py-4 border-2 border-primary text-white rounded-2xl font-semibold duration-500 hover:bg-primary hover:border-black hover:text-black transition-colors"
            @click.stop="scrollToContact"
          >
            Indítsuk el a weboldalad!
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center h-screen w-full">
      <img src="@/assets/hero.png" alt="Hero Image" class="w-3/4 h-auto object-cover rounded-lg" />
    </div>
  </div>
</template>

<style scoped>
@keyframes glow {
  0%,
  100% {
    --tw-gradient-to: #fdcf5d;
  }
  33% {
    --tw-gradient-to: #fca311;
  }
  66% {
    --tw-gradient-to: #b57c02;
  }
}

.animate-glow {
  animation: glow 6s infinite;
}
</style>
