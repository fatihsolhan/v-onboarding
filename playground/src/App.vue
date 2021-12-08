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
        >v-onboarding is a super-slim, fully-typed onboarding plugin for Vue3</p>
      </div>
      <div class="flex items-center space-x-4 mt-10">
        <a
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
          @click="startOnboarding"
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
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { VOnboardingStep, VOnboardingWrapper } from '../../src/index'
import Features from './components/Features.vue'
const wrapper = ref(null)

const startOnboarding = () => {
  wrapper.value?.start()
}
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
])
</script>
