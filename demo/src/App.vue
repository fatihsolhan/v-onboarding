<template>
  <div>
    <div class="min-h-screen pb-32">
      <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />
      <AppHeader />
      <div class="max-w-3xl mx-auto px-4">
        <div class="w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">
          <h1
            class="max-w-5xl text-center mx-auto text-4xl font-extrabold sm:text-7xl lg:text-8xl xl:text-8xl !leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#42b883] via-[#42b883] to-white">
            v-onboarding</h1>
          <p class="mx-auto mt-6 text-lg sm:text-xl font-medium leading-tight text-center text-gray-400">v-onboarding is
            a super-slim, fully-typed onboarding component for Vue 3</p>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 ">
          <AppButton loading={loading} variant="primary" @click="see">See it in action</AppButton>
          <a href="https://v-onboarding-docs.fatihsolhan.com">
            <AppButton variant="secondary">Documentation</AppButton>
          </a>
        </div>
      </div>
      <div v-if="showCats" class="container mt-12 max-w-4xl px-4">
        <Cats :cats="cats" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ComponentPublicInstance, computed, defineComponent, onMounted, ref } from 'vue';
import { useVOnboarding, VOnboardingWrapper } from 'v-onboarding';
import type { VOnboardingWrapperOptions } from 'v-onboarding'
import 'v-onboarding/style';
import CatType from '../types/CatType';
import AppButton from './components/AppButton.vue';
import AppHeader from './components/AppHeader.vue';
import Cats from './components/Cats.vue';
export default defineComponent({
  components: {
    AppHeader,
    Cats,
    AppButton,
    VOnboardingWrapper
  },
  setup() {
    const wrapper = ref<ComponentPublicInstance<typeof VOnboardingWrapper> | null>(null)
    const cats = ref<CatType[]>([])
    const showCats = ref(false)
    const { start, goToStep } = useVOnboarding(wrapper)
    const fetchCats = async () => {
      const result = await fetch("https://api.api-ninjas.com/v1/cats?min_life_expectancy=1", {
        headers: {
          "X-API-KEY": "LUtgGg3Y+UnesrnU3v+daQ==o1VRpX0ymNwBCtnq",
        }
      }).then(res => res.json())
      cats.value = result.slice(0, 4)
    }

    onMounted(() => {
      fetchCats()
    })

    const see = async () => {
      if (!showCats.value) {
        showCats.value = true
      }
      goToStep(0)
    }

    const steps = computed(() => {
      return [
        {
        attachTo: {
          element: "h1",
        },
        content: {
          title: 'Nice to see you here!',
          description: 'You can use v-onboarding to show some information about your app, or to explain how to use it',
        }
      },
      {
        attachTo: {
          element: "#cats",
        },
        content: {
          title: 'Here is some cat breeds to show you how v-onboarding works',
          description: 'Click next to see information about each cat.',
        }
      },
      ...cats.value.map((cat, index) => {
        return {
          attachTo: {
            element: `#cat-${index}`
          },
          content: {
            title: cat.name,
            description: `This cat's origin is ${cat.origin}. It's length is ${cat.length}.`,
          }
        }
      })]
    })

    const options  = {
      popper: {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          }
        ]
      }
    } as VOnboardingWrapperOptions

    return {
      steps,
      cats,
      see,
      showCats,
      wrapper,
      options
    }
  }
})
</script>
