<template>
  <div v-if="isActive" data-v-onboarding-wrapper style="pointer-events: auto;">
    <slot v-if="showStep" :key="currentIndex" :step="currentStep" :next="next" :previous="previous" :exit="exit"
      :is-first="isFirstStep" :is-last="isLastStep" :index="currentIndex">
      <VOnboardingStep :key="currentIndex" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import VOnboardingStep from '@/components/VOnboardingStep.vue'
import useGetElement from '@/composables/useGetElement'
import { defaultVOnboardingWrapperOptions } from '@/options/VOnboardingWrapper'
import { OnboardingState, Direction, STATE_INJECT_KEY } from '@/types/internal'
import type { StepEntity, onBeforeStepOptions, onAfterStepOptions, VOnboardingWrapperOptions } from '@/types/lib'
import merge from 'lodash.merge'
import { computed, provide, ref } from 'vue'

const props = withDefaults(defineProps<{
  steps: StepEntity[]
  options?: VOnboardingWrapperOptions
}>(), {
  steps: () => [],
  options: () => ({})
})

const emit = defineEmits<{
  finish: []
  exit: [index: number]
}>()

const currentIndex = ref(OnboardingState.IDLE)
const showStep = ref(true)

const mergedOptions = computed(() => merge({}, defaultVOnboardingWrapperOptions, props.options))
const currentStep = computed(() => props.steps?.[currentIndex.value])
const isActive = computed(() => currentIndex.value >= 0 && currentIndex.value < props.steps.length)
const isFirstStep = computed(() => currentIndex.value === 0)
const isLastStep = computed(() => currentIndex.value === props.steps.length - 1)

function getStepOptions(step?: StepEntity): VOnboardingWrapperOptions {
  return step ? merge({}, mergedOptions.value, step.options) : mergedOptions.value
}

const POINTER_ATTR = 'data-v-onboarding-pointer-events'

function setInteraction(element: HTMLElement | null, value: 'none' | 'auto'): void {
  if (!element?.style || element.style.pointerEvents === value) return
  const current = element.style.pointerEvents
  if (current) element.setAttribute(POINTER_ATTR, current)
  element.style.pointerEvents = value
}

function restoreInteraction(element: HTMLElement | null): void {
  if (!element?.style) return
  const stored = element.getAttribute(POINTER_ATTR)
  if (stored) {
    element.style.pointerEvents = stored
    element.removeAttribute(POINTER_ATTR)
  } else {
    element.style.removeProperty('pointer-events')
  }
}

function createHookOptions(step: StepEntity, index: number, direction: Direction) {
  return {
    index,
    step,
    direction,
    isForward: direction === Direction.FORWARD,
    isBackward: direction === Direction.BACKWARD,
  }
}

function runSetup(step: StepEntity, index: number, direction: Direction) {
  const element = useGetElement(step.attachTo.element) as HTMLElement
  const options = getStepOptions(step)

  if (step.attachTo.classList?.length) {
    element?.classList.add(...step.attachTo.classList)
  }

  if (options?.overlay?.preventOverlayInteraction) {
    setInteraction(document.body, 'none')
    setInteraction(element, 'auto')
  }

  return step.on?.beforeStep?.(createHookOptions(step, index, direction) as onBeforeStepOptions)
}

function runCleanup(step: StepEntity, index: number, direction: Direction) {
  const element = useGetElement(step.attachTo.element) as HTMLElement
  const options = getStepOptions(step)

  if (step.attachTo.classList?.length) {
    element?.classList.remove(...step.attachTo.classList)
  }

  if (options?.overlay?.preventOverlayInteraction) {
    restoreInteraction(element)
  }

  return step.on?.afterStep?.(createHookOptions(step, index, direction) as onAfterStepOptions)
}

function goToStep(target: number | ((current: number) => number)): void {
  const newIndex = typeof target === 'function' ? target(currentIndex.value) : target
  const oldIndex = currentIndex.value

  if (newIndex === oldIndex) return

  const direction = newIndex > oldIndex ? Direction.FORWARD : Direction.BACKWARD
  const oldStep = props.steps[oldIndex]
  const newStep = props.steps[newIndex]

  if (getStepOptions(newStep)?.hideNextStepDuringHook) {
    showStep.value = false
  }

  currentIndex.value = newIndex

  ;(async () => {
    if (oldStep) await runCleanup(oldStep, oldIndex, direction)
    if (newStep) await runSetup(newStep, newIndex, direction)
    showStep.value = true
  })()
}

function start(): void {
  goToStep(0)
}

function finish(): void {
  const step = props.steps[currentIndex.value]
  const index = currentIndex.value

  currentIndex.value = OnboardingState.FINISHED
  restoreInteraction(document.body)
  emit('finish')

  if (step) runCleanup(step, index, Direction.FORWARD)
}

function exit(): void {
  emit('exit', currentIndex.value)
}

function previous(): void {
  goToStep(i => i - 1)
}

function next(): void {
  if (isLastStep.value) {
    finish()
  } else {
    goToStep(i => i + 1)
  }
}

const state = computed(() => ({
  step: currentStep,
  options: mergedOptions,
  next,
  previous,
  finish,
  exit,
  isFirstStep,
  isLastStep
} as OnboardingState))

provide(STATE_INJECT_KEY, state)

defineExpose({ start, finish, goToStep })
</script>
