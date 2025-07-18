<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Mail, Clock, CheckCircle, Send } from 'lucide-vue-next'
import BaseButton from '@/components/global/BaseButton.vue'

const contactContainer = ref(null)
const isVisible = ref(false)
const animatedItems = ref([])

// Form state
const formData = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

// Marketing points
const marketingPoints = [
  {
    icon: Mail,
    title: 'Közvetlen kapcsolat',
    description:
      'Személyesen válaszolok minden megkeresésre. Nincs automatikus rendszer, nincs várakozás.',
    delay: 0,
  },
  {
    icon: Clock,
    title: '24 órás válaszidő',
    description: 'Munkanapokon 24 órán belül visszajelzést kapsz minden megkeresésre.',
    delay: 200,
  },
  {
    icon: CheckCircle,
    title: 'Ingyenes konzultáció',
    description: 'Az első beszélgetés mindig ingyenes. Tisztázzuk a célokat, elvárásokat közösen.',
    delay: 400,
  },
]

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isVisible.value) {
      isVisible.value = true

      // Animate items with staggered delay
      marketingPoints.forEach((point, index) => {
        setTimeout(() => {
          animatedItems.value[index] = true
        }, point.delay)
      })

      // Animate form
      setTimeout(() => {
        animatedItems.value[marketingPoints.length] = true
      }, 600)
    }
  })
}

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    return
  }

  isSubmitting.value = true

  // Simulate form submission
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true

    // Reset form after success message
    setTimeout(() => {
      formData.value = { name: '', email: '', message: '' }
      isSubmitted.value = false
    }, 3000)
  }, 1500)
}

let observer

onMounted(() => {
  // Initialize animated items array
  animatedItems.value = new Array(marketingPoints.length + 1).fill(false)

  // Set up intersection observer
  observer = new IntersectionObserver(observerCallback, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  })

  if (contactContainer.value) {
    observer.observe(contactContainer.value)
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
    ref="contactContainer"
    id="kapcsolat"
    class="scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-dark via-secondary/20 to-dark relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-1/3 left-1/3 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/3 w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-primary rounded-full blur-3xl animate-pulse delay-1000"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="space-y-4 transition-all duration-1000 ease-out"
          :class="isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'"
        >
          <h2 class="text-sm font-light tracking-wider text-light uppercase mb-4">KAPCSOLAT</h2>
          <h3
            class="text-3xl sm:text-4xl lg:text-5xl font-bold font-jetbrains text-white leading-tight"
          >
            Kezdjük el
            <span class="text-primary">közösen!</span>
          </h3>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
        <!-- Left Side - Marketing Content -->
        <div class="space-y-12">
          <!-- Email Contact -->
          <div
            class="text-center lg:text-left transition-all duration-800 ease-out"
            :class="isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'"
          >
            <div class="inline-flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div class="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-full">
                <Mail class="w-6 h-6 text-primary" />
              </div>
              <div>
                <p class="text-light text-sm uppercase tracking-wider">Írj nekem</p>
                <a
                  href="mailto:zsofenszki.kristof@gmail.com"
                  class="text-base sm:text-xl font-jetbrains text-white hover:text-primary transition-colors duration-300 break-all"
                >
                  zsofenszki.kristof@gmail.com
                </a>
              </div>
            </div>
          </div>

          <!-- Marketing Points -->
          <div class="space-y-8">
            <div v-for="(point, index) in marketingPoints" :key="index">
              <div
                class="group flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-br from-secondary/30 to-dark/50 border border-secondary/20 hover:border-primary/30 transition-all duration-800 ease-out"
                :class="animatedItems[index]
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'"
              >
                <!-- Icon -->
                <div class="relative flex-shrink-0">
                  <div
                    class="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500 scale-150"
                  ></div>
                  <div
                    class="relative bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-full group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-500"
                  >
                    <component
                      :is="point.icon"
                      class="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1">
                  <h4
                    class="text-xl font-bold font-jetbrains text-white group-hover:text-primary transition-colors duration-300 mb-2"
                  >
                    {{ point.title }}
                  </h4>
                  <p
                    class="text-light leading-relaxed group-hover:text-white transition-colors duration-300"
                  >
                    {{ point.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust Message -->
          <div
            class="text-center lg:text-left transition-all duration-800 ease-out delay-500"
            :class="isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'"
          >
            <p class="text-light text-lg leading-relaxed">
              Minden projekt egyedi kihívás számomra.
              <span class="text-primary font-semibold"
              >Közösen alakítjuk ki a tökéletes megoldást</span
              >
              az elképzeléseid alapján.
            </p>
          </div>
        </div>

        <!-- Right Side - Contact Form -->
        <div
          class="transition-all duration-1000 ease-out"
          :class="animatedItems[marketingPoints.length]
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-12 scale-95'"
        >
          <div class="bg-gradient-to-br from-secondary/40 to-dark/60 border border-secondary/30 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <!-- Form Background Effect -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/50 opacity-50"
            ></div>

            <div class="relative z-10">
              <!-- Form Header -->
              <div class="mb-8">
                <h4 class="text-2xl font-bold font-jetbrains text-white mb-2">
                  Meséld el az ötleted!
                </h4>
                <p class="text-light">
                  Minél részletesebb vagy, annál pontosabb ajánlatot tudok készíteni.
                </p>
              </div>

              <!-- Success Message -->
              <transition
                enter-active-class="transition-all duration-500 ease-out"
                enter-from-class="opacity-0 transform scale-95"
                enter-to-class="opacity-100 transform scale-100"
                leave-active-class="transition-all duration-500 ease-out"
                leave-from-class="opacity-100 transform scale-100"
                leave-to-class="opacity-0 transform scale-95"
              >
                <div v-if="isSubmitted" class="text-center py-12 space-y-4">
                  <div
                    class="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4"
                  >
                    <CheckCircle class="w-8 h-8 text-green-400" />
                  </div>
                  <h5 class="text-xl font-bold text-white">Üzenet elküldve!</h5>
                  <p class="text-light">24 órán belül válaszolok rá.</p>
                </div>
              </transition>

              <!-- Contact Form -->
              <form v-if="!isSubmitted" @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name Field -->
                <div>
                  <label class="block text-light text-sm font-medium mb-2">
                    Név *
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-dark/50 border border-secondary/30 rounded-lg text-white placeholder-light/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    placeholder="Hogy szólítsalak?"
                  />
                </div>

                <!-- Email Field -->
                <div>
                  <label class="block text-light text-sm font-medium mb-2">
                    Email cím *
                  </label>
                  <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 bg-dark/50 border border-secondary/30 rounded-lg text-white placeholder-light/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    placeholder="example@email.com"
                  />
                </div>

                <!-- Message Field -->
                <div>
                  <label class="block text-light text-sm font-medium mb-2">
                    Projekt leírás *
                  </label>
                  <textarea
                    v-model="formData.message"
                    rows="6"
                    required
                    class="w-full px-4 py-3 bg-dark/50 border border-secondary/30 rounded-lg text-white placeholder-light/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-none"
                    placeholder="Milyen weboldalra van szükséged? Meséld el a céljaidat, elképzeléseidet, funkciókat..."
                  ></textarea>
                </div>

                <!-- Privacy Checkbox -->
                <div class="flex items-start space-x-3">
                  <div class="relative flex items-center justify-center mt-1">
                    <input
                      id="privacy-checkbox"
                      v-model="formData.privacyAccepted"
                      type="checkbox"
                      class="sr-only"
                      required
                    />
                    <label
                      for="privacy-checkbox"
                      class="relative flex items-center justify-center w-5 h-5 bg-dark/50 border-2 border-primary/50 rounded cursor-pointer transition-all duration-300 hover:border-primary"
                      :class="formData.privacyAccepted ? 'bg-primary border-primary' : ''"
                    >
                      <svg
                        v-if="formData.privacyAccepted"
                        class="w-3 h-3 text-dark"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </label>
                  </div>
                  <label for="privacy-checkbox" class="text-sm text-light leading-relaxed cursor-pointer">
                    Elfogadom az
                    <a
                      href="/adatvedelmi-tajekoztato"
                      target="_blank"
                      class="text-primary hover:text-primary/80 transition-colors duration-300 underline"
                    >
                      adatvédelmi tájékoztatót
                    </a>
                    <span class="text-primary">*</span>
                  </label>
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                  <BaseButton
                    type="submit"
                    :disabled="
                      isSubmitting || !formData.name || !formData.email || !formData.message
                    "
                    class="w-full py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span v-if="!isSubmitting">Elküldés</span>
                    <span v-else>Küldés...</span>
                    <Send :class="['w-4 h-4', isSubmitting ? 'animate-pulse' : '']" />
                  </BaseButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(20, 33, 61, 0.3);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(252, 163, 17, 0.3);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(252, 163, 17, 0.5);
}
</style>
