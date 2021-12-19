<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ previous, next, step, exit, isFirst, isLast, index }">
      <VOnboardingStep>
        <div class="w-80 p-4 bg-white rounded-md shadow-md">
          <div class="flex justify-between">
            <span
              v-if="step.content?.title"
              class="text-xl font-medium leading-normal"
              :class="[index === 2 ? 'transform -rotate-6 translate-y-1' : '']"
            >{{ step.content?.title }}</span>
            <button
              @click="exit"
              class="inline-flex items-center justify-center w-6 h-6 flex-shrink-0 rounded-full hover:bg-black/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <template v-if="index === 3">
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              autoplay
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </template>
          <p
            v-if="step.content?.description"
            class="text-sm text-gray-600 mt-2"
          >{{ step.content.description }}</p>
          <div class="flex mt-4 space-x-2" :class="{ 'h-6': index === 2 }">
            <button
              v-if="!isFirst"
              type="button"
              @click="previous"
              class="inline-flex flex-1 p-2 items-center justify-center border border-solid text-base font-medium rounded-full bg-transparent cursor-pointer border-gray-400 text-gray-800 hover:bg-gray-100"
            >Previous</button>
            <button
              @click="next"
              type="button"
              class="inline-flex flex-1 p-2 items-center justify-center border border-solid text-base font-medium rounded-full bg-transparent cursor-pointer border-transparent text-white bg-indigo-600 hover:bg-indigo-700"
            >{{ isLast ? 'Finish' : 'Next' }}</button>
          </div>
        </div>
      </VOnboardingStep>
    </template>
  </VOnboardingWrapper>
  <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
    <div class="flex flex-col items-center py-10">
      <div class="text-center space-y-4">
        <h1 class="text-5xl font-bold text-gray-700">v-onboarding</h1>
        <p
          class="font-medium text-gray-700 mt-3"
        >v-onboarding is a super-slim, fully-typed onboarding component for Vue 3</p>
      </div>
      <div class="flex items-center space-x-4 mt-10">
        <a
          id="github"
          href="https://github.com/fatihsolhan/v-onboarding"
          class="inline-flex items-center px-6 py-2 text-sm font-medium rounded-full text-white bg-gray-700 hover:bg-gray-800"
        >Github</a>
        <a
          href="https://github.com/fatihsolhan/v-onboarding#v-onboarding"
          class="inline-flex items-center px-6 py-2 text-sm font-medium rounded-full text-white bg-indigo-700 hover:bg-indigo-800"
        >Documentation</a>
      </div>
      <div class="flex items-center justify-center mt-8 md:mt-20">
        <button
          id="launch-nuke"
          @click="start"
          type="button"
          class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="-ml-1 mr-3 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          DO NOT PRESS THIS BUTTON
        </button>
      </div>
      <Features class="mt-10 md:mt-20" />
    </div>
  </div>
  <div class="w-full py-12 bg-gray-700 mt-20" id="controls">
    <div class="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
      <h1 class="text-3xl md:text-4xl text-white font-bold text-center">
        You can start, stop or jump to any step easily
      </h1>
      <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-20">
        <button
          @click="start"
          type="button"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >Start Onboarding</button>
        <button
          @click="stop"
          type="button"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >Finish Onboarding</button>
        <button
          @click="goToStep(2)"
          type="button"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >Jump to second step</button>
      </div>
    </div>
  </div>
  <div class="w-full py-4 bg-green-700 mt-20" id="author">
    <div class="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
      <p class="text-3x text-white font-medium text-center">
        Built with ❤️ by <a href="https://twitter.com/fatihsolhann" class="underline">Fatih Solhan</a>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ComponentPublicInstance, ref } from 'vue'
import { useVOnboarding, VOnboardingStep, VOnboardingWrapper } from '../../src/index'
import Features from './components/Features.vue'
const wrapper = ref<ComponentPublicInstance<typeof VOnboardingWrapper> | null>(null)

const { start, finish, goToStep } = useVOnboarding(wrapper)

const steps = ref([
  {
    attachTo: {
      element: "#launch-nuke",
    },
    content: {
      title: "Well.. You're here..",
      description: "You couldn't hold yourself, right? Anyway, while you are here let me introduce to you with 🔥 v-onboarding 🔥"
    }
  },
  {
    attachTo: {
      element: "#feature-1",
    },
    content: {
      title: "Everything is under control!",
    },
    on: {
      beforeStep: () => {
        console.log("Step starting: Feature 1")
      },
      afterStep: () => {
        console.log("Step ended: Feature 1");
      },
    },
  },
  {
    attachTo: {
      element: "#feature-2",
    },
    content: {
      title: "Do you think you can style it better?",
      description: "Of course you can! Use the default slot and show your magic ✨",
    },
    on: {
      beforeStep: () => {
        console.log("Step starting: Feature 2")
      },
      afterStep: () => {
        console.log("Step ended: Feature 2");
      },
    },
  },
  {
    attachTo: {
      element: "#feature-3",
    },
    content: {
      title: "Who doesn't need more?",
      description: "Just let us know what do you need and I promise we will discuss it with you 🙌",
    },
    on: {
      beforeStep: () => {
        console.log("Step starting: Feature 3")
      },
      afterStep: () => {
        console.log("Step ended: Feature 3");
      },
    },
  },
  {
    attachTo: {
      element: "#controls",
    },
    content: {
      title: "You can control the onboarding process easily",
    }
  },
  {
    attachTo: {
      element: "#github",
    },
    content: {
      title: "Please give a star on Github if you like it!",
    }
  },
  {
    attachTo: {
      element: "#author",
    },
    content: {
      title: "How about a following me on twitter?",
    }
  },
])
</script>
<style>
.polka-bg {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 0.5px, transparent 0.5px),
    radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
</style>
