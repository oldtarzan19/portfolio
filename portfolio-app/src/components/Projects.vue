<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ExternalLink } from 'lucide-vue-next'
import templyxImg from '@/assets/templyx.png'
import summakerImg from '@/assets/summaker.png'
import pandatalkImg from '@/assets/pandatalk.png'
import portfolioImg from '@/assets/portfolio.png'
import BaseButton from '@/components/global/BaseButton.vue'

// Projektek adatai
const projects = ref([
  {
    id: 1,
    title: 'Templyx – Social Media Scheduler & Analytics',
    description:
      'Social media posztütemező és analitikai eszköz, amellyel a felhasználók több platformra időzíthetnek be posztokat, és részletes statisztikákat kapnak a teljesítményről. Laravel 11, Vue 3, MySQL, Tailwind és Stripe alapokra épült.',
    image: templyxImg,
    techStack: ['Laravel 11', 'Vue 3', 'MySQL', 'Tailwind CSS', 'Stripe'],
    link: 'https://templyx.com',
    linkDisabled: false,
  },
  {
    id: 2,
    title: 'Summaker – Tanulást segítő webalkalmazás',
    description:
      'Tanulást segítő webalkalmazás diákoknak, ahol PDF-dokumentumokból automatikus összefoglalók és tanulókártyák készülnek. Kérdezési lehetőséggel és kártyás gyakorlással támogatja a hatékony tanulást. Laravel 10, Blade, MySQL és Stripe alapokon.',
    image: summakerImg,
    techStack: ['Laravel 11', 'Blade', 'MySQL', 'Tailwind CSS', 'Stripe'],
    link: 'https://summaker.hu',
    linkDisabled: false,
  },
  {
    id: 3,
    title: 'PandaTalk – Business Eszköz',
    description:
      'Google My Business integrációval működő automatizált rendszer, amely cégek helyett reagál az ügyfélértékelésekre. A PandaTalk adott időintervallumonként frissíti a beérkező értékeléseket, és automatikusan választ küld, így növelve az ügyfél-elégedettséget és tehermentesítve a vállalkozásokat.',
    image: pandatalkImg,
    techStack: ['Laravel 10', 'Tailwind', 'Mysql', 'Blade', 'Google API'],
    link: '',
    linkDisabled: true,
  },
  {
    id: 4,
    title: 'Portfólió Weboldal',
    description:
      'Kreatív portfólió oldal smooth animációkkal és modern design elemekkel. Teljesen egyedi kialakítás és optimalizált teljesítmény.',
    image: portfolioImg,
    techStack: ['Vue 3', 'Tailwind', 'Firebase'],
    link: '',
    linkDisabled: true,
  },
])

// Reactive változók
const currentProjectIndex = ref(0)
const isVisible = ref(false)
const projectsContainer = ref(null)
const isAnimating = ref(false)

// Auto-play funkció
let autoPlayInterval

const nextProject = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  setTimeout(() => {
    currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.value.length
    isAnimating.value = false
  }, 600) // Swipe animáció időtartama
}

const goToProject = (index) => {
  if (isAnimating.value || index === currentProjectIndex.value) return

  isAnimating.value = true
  setTimeout(() => {
    currentProjectIndex.value = index
    isAnimating.value = false
  }, 600)
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextProject()
  }, 6000) // 6 másodpercenként vált
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
}

// Intersection Observer
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isVisible.value) {
      isVisible.value = true
    }
  })
}

let observer

onMounted(() => {
  // Intersection Observer beállítása
  observer = new IntersectionObserver(observerCallback, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
  })

  if (projectsContainer.value) {
    observer.observe(projectsContainer.value)
  }

  // Auto-play indítása
  startAutoPlay()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
  stopAutoPlay()
})
</script>

<template>
  <div
    ref="projectsContainer"
    id="projektek"
    class="scroll-mt-24 py-24 bg-gradient-to-r from-dark animate-glow relative overflow-x-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-8 md:px-16 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="space-y-4 transition-all duration-1000 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <h2 class="text-sm font-light tracking-wider text-light uppercase mb-4">PROJEKTEK</h2>
          <h3 class="text-3xl sm:text-5xl font-bold font-jetbrains text-white leading-tight">
            Íme néhány
            <span class="text-primary">elkészült munkám</span>
          </h3>
        </div>
      </div>

      <!-- Project Display -->
      <div class="max-w-7xl mx-auto px-4 md:px-0">
        <div
          class="relative transition-all duration-1000 ease-out delay-300"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        >
          <!-- Project Content Container -->
          <transition
            enter-active-class="transition-all duration-600 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-600 ease-out"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <div
              :key="currentProjectIndex"
              class="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[500px]"
            >
              <!-- Left Side - Project Info -->
              <div
                class="flex-1 space-y-6 transition-all duration-600 ease-out text-center lg:text-left"
              >
                <h4
                  class="text-2xl sm:text-4xl font-bold font-jetbrains text-white mb-4 leading-tight"
                >
                  {{ projects[currentProjectIndex].title }}
                </h4>
                <p
                  class="text-base sm:text-lg text-light leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
                >
                  {{ projects[currentProjectIndex].description }}
                </p>
                <div class="mb-8">
                  <h5 class="text-sm font-light tracking-wider text-light uppercase mb-4">
                    TECHNOLÓGIÁK
                  </h5>
                  <div class="flex flex-wrap gap-3">
                    <span
                      v-for="tech in projects[currentProjectIndex].techStack"
                      :key="tech"
                      class="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full text-primary font-medium text-sm hover:from-primary/20 hover:to-primary/10 transition-all duration-300"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
                <BaseButton
                  v-if="!projects[currentProjectIndex].linkDisabled"
                  :href="projects[currentProjectIndex].link"
                >
                  <ExternalLink class="w-5 h-5" />
                  Projekt megtekintése
                </BaseButton>
              </div>

              <!-- Right Side - Project Image -->
              <div class="flex-1 flex justify-center mt-8 lg:mt-0">
                <div class="relative group animate-float">
                  <div
                    class="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-500 scale-110"
                  ></div>
                  <img
                    :src="projects[currentProjectIndex].image"
                    :alt="projects[currentProjectIndex].title"
                    class="relative w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Project Indicators -->
      <div
        class="flex justify-center mt-12 space-x-2 sm:space-x-4 transition-all duration-1000 ease-out delay-500"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <button
          v-for="(project, index) in projects"
          :key="project.id"
          @click="goToProject(index)"
          class="relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-110"
          :class="[
            index === currentProjectIndex
              ? 'bg-primary scale-125'
              : 'bg-secondary/50 hover:bg-secondary/80',
          ]"
        >
          <div
            v-if="index === currentProjectIndex"
            class="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"
          ></div>
          <div
            v-if="index === currentProjectIndex"
            class="absolute inset-0 rounded-full border-2 border-primary/30"
          ></div>
        </button>
      </div>
    </div>
  </div>
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

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-glow {
  animation: glow 6s infinite;
}

@keyframes glow {
  0%,
  100% {
    --tw-gradient-to: #14213d;
  }
  66% {
    --tw-gradient-to: #1c3d85;
  }
}
</style>
