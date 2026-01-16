<template>
  <div v-if="!isFinished" data-v-onboarding-wrapper style="pointer-events: auto;">
    <slot v-if="showStep" :key="index" :step="activeStep" :next="next" :previous="previous" :exit="exit"
      :is-first="isFirstStep" :is-last="isLastStep" :index="index">
      <VOnboardingStep :key="index" />
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
import { computed, provide, ref, watch } from 'vue'

// Props & Emits
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

// State
const showStep = ref(true)
const index = ref(OnboardingState.IDLE)
const privateIndex = ref(index.value)

// Computed
const mergedOptions = computed(() => merge({}, defaultVOnboardingWrapperOptions, props.options))
const activeStep = computed(() => props.steps?.[privateIndex.value])
const isFinished = computed(() => privateIndex.value === OnboardingState.FINISHED)
const isFirstStep = computed(() => privateIndex.value === 0)
const isLastStep = computed(() => privateIndex.value === props.steps.length - 1)

const getStepOptions = (step?: StepEntity) => step ? merge({}, mergedOptions.value, step.options) : mergedOptions.value

// Pointer events management
const POINTER_EVENTS_ATTR = 'data-v-onboarding-pointer-events'

const setPointerEvents = (element: HTMLElement | null, value: string) => {
  if (!element) return
  const current = element.style.pointerEvents
  if (current) element.setAttribute(POINTER_EVENTS_ATTR, current)
  element.style.pointerEvents = value
}

const restorePointerEvents = (element: HTMLElement | null) => {
  if (!element) return
  const stored = element.getAttribute(POINTER_EVENTS_ATTR)
  if (stored) {
    element.style.pointerEvents = stored
    element.removeAttribute(POINTER_EVENTS_ATTR)
  } else {
    element.style.removeProperty('pointer-events')
  }
}

// Class management
const addClass = (element: Element | null, classList?: string[]) => {
  if (element && classList?.length) element.classList.add(...classList)
}

const removeClass = (element: Element | null, classList?: string[]) => {
  if (element && classList?.length) element.classList.remove(...classList)
}

// Step hooks
const runBeforeHook = (step: StepEntity, options: onBeforeStepOptions) => {
  const element = useGetElement(step.attachTo.element) as HTMLElement
  const stepOptions = getStepOptions(step)

  if (stepOptions?.overlay?.preventOverlayInteraction) {
    setPointerEvents(element, 'auto')
  }
  addClass(element, step.attachTo.classList)
  return step.on?.beforeStep?.(options)
}

const runAfterHook = (step: StepEntity, options: onAfterStepOptions) => {
  const element = useGetElement(step.attachTo.element) as HTMLElement
  const stepOptions = getStepOptions(step)

  if (stepOptions?.overlay?.preventOverlayInteraction) {
    restorePointerEvents(element)
  }
  removeClass(element, step.attachTo.classList)
  return step.on?.afterStep?.(options)
}

// Navigation
const setIndex = (value: number | ((current: number) => number)) => {
  index.value = typeof value === 'function' ? value(index.value) : value
}

const start = () => setIndex(0)

const finish = () => {
  setIndex(OnboardingState.FINISHED)
  emit('finish')
}

const exit = () => emit('exit', privateIndex.value)

const previous = () => setIndex(current => current - 1)

const next = () => {
  const nextIndex = privateIndex.value + 1
  if (nextIndex >= props.steps.length) {
    finish()
  } else {
    setIndex(nextIndex)
  }
}

// Update body pointer events based on state
const updateBodyPointerEvents = () => {
  const body = document.body
  const isIdle = [OnboardingState.IDLE, OnboardingState.FINISHED].includes(privateIndex.value)

  if (isIdle) {
    restorePointerEvents(body)
  } else {
    setPointerEvents(body, 'none')
  }
}

// Watch index changes
watch(index, async (newIndex, oldIndex) => {
  const direction = newIndex < oldIndex ? Direction.BACKWARD : Direction.FORWARD
  const hookOptions = {
    direction,
    isForward: direction === Direction.FORWARD,
    isBackward: direction === Direction.BACKWARD,
  }

  // Run after hook for old step
  const oldStep = props.steps?.[oldIndex]
  if (oldStep) {
    restorePointerEvents(useGetElement(oldStep.attachTo.element) as HTMLElement)
    await runAfterHook(oldStep, { ...hookOptions, index: oldIndex, step: oldStep })
  }

  // Run before hook for new step
  const newStep = props.steps?.[newIndex]
  if (newStep) {
    restorePointerEvents(useGetElement(newStep.attachTo.element) as HTMLElement)

    if (getStepOptions(newStep)?.hideNextStepDuringHook) {
      showStep.value = false
    }
    await runBeforeHook(newStep, { ...hookOptions, index: newIndex, step: newStep })
  }

  privateIndex.value = newIndex
  showStep.value = true
  restorePointerEvents(document.body)

  const currentOptions = getStepOptions(props.steps?.[newIndex])
  if (currentOptions?.overlay?.preventOverlayInteraction) {
    updateBodyPointerEvents()
  }
})

// Provide state to child components
const state = computed(() => ({
  step: activeStep,
  options: mergedOptions,
  next,
  previous,
  finish,
  exit,
  isFirstStep,
  isLastStep
} as OnboardingState))

provide(STATE_INJECT_KEY, state)

// Expose methods
defineExpose({ start, finish, goToStep: setIndex })
</script>
