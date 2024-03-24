<template>
  <div v-if="!isFinished" data-v-onboarding-wrapper style="pointer-events: auto;">
    <slot v-if="showStep" :key="index" :step="activeStep" :next="next" :previous="previous" :exit="exit"
      :is-first="isFirstStep" :is-last="isLastStep" :index="index">
      <VOnboardingStep :key="index" />
    </slot>
  </div>
</template>
<script lang="ts">
import VOnboardingStep from '@/components/VOnboardingStep.vue';
import useGetElement from '@/composables/useGetElement';
import { defaultVOnboardingWrapperOptions } from '@/options/VOnboardingWrapper';
import { OnboardingState, Direction, STATE_INJECT_KEY } from '@/types/internal';
import type { StepEntity, onBeforeStepOptions, onAfterStepOptions } from '@/types/lib';
import { VOnboardingWrapperOptions } from '@/types/lib';
import merge from 'lodash.merge';
import { computed, ComputedRef, defineComponent, PropType, provide, ref, watch } from 'vue';
export default defineComponent({
  name: 'VOnboardingWrapper',
  components: {
    VOnboardingStep
  },
  props: {
    steps: {
      type: Array as PropType<StepEntity[]>,
      default: () => []
    },
    options: {
      type: Object as PropType<VOnboardingWrapperOptions>,
      default: () => ({})
    }
  },
  emits: ['finish', 'exit'],
  setup(props, { expose, emit }) {
    const mergedOptions = computed(() => merge({}, defaultVOnboardingWrapperOptions, props.options))
    const showStep = ref(true)
    const index = ref(OnboardingState.IDLE)
    const privateIndex = ref(index.value)
    const setIndex = (value: number | ((_: number) => number)) => {
      if (typeof value === 'function') {
        index.value = value(index.value);
      } else {
        index.value = value;
      }
    }
    const activeStep = computed(() => props.steps?.[privateIndex.value])
    const activeStepMergedOptions = computed(() => {
      return activeStep.value ? merge({}, mergedOptions.value, activeStep.value.options) : mergedOptions.value
    })
    const mergeOptions = (step: StepEntity) => {
      return merge({}, mergedOptions.value, step.options)
    }
    const { beforeHook, afterHook } = useStepHooks(activeStepMergedOptions)
    watch(index, async (newIndex, oldIndex) => {
      const direction: number = newIndex < oldIndex ? Direction.BACKWARD : Direction.FORWARD
      const globalHookOptions = {
        direction: direction,
        isForward: direction === Direction.FORWARD,
        isBackward: direction === Direction.BACKWARD,
      }
      const oldStep = props.steps?.[oldIndex]
      if (oldStep) {
        const afterHookOptions: onAfterStepOptions = {
          ...globalHookOptions,
          // custom afterHookOptions here
          index: oldIndex,
          step: oldStep,
        }
        removePointerEvents(useGetElement(oldStep.attachTo.element) as HTMLElement)
        await afterHook(oldStep, afterHookOptions)
      }
      const newStep = props.steps?.[newIndex]
      if (newStep) {
        const beforeHookOptions: onBeforeStepOptions = {
          ...globalHookOptions,
          // custom afterHookOptions here
          index: newIndex,
          step: newStep,
        }
        removePointerEvents(useGetElement(newStep.attachTo.element) as HTMLElement)
        if (mergeOptions(newStep)?.hideNextStepDuringHook) {
          showStep.value = false
        }
        await beforeHook(newStep, beforeHookOptions)
      }
      privateIndex.value = newIndex
      showStep.value = true
      removePointerEvents(useGetElement('body') as HTMLElement)
      if (activeStepMergedOptions.value.overlay?.preventOverlayInteraction) {
        updateBodyPointerEvents()
      }
    })
    const { addPointerEvents, removePointerEvents } = useSetPointerEvents()
    const updateBodyPointerEvents = () => {
      const body = useGetElement('body') as HTMLBodyElement | null
      if (!body) return;
      if ([OnboardingState.IDLE, OnboardingState.FINISHED].includes(privateIndex.value)) {
        removePointerEvents(body)
      } else {
        addPointerEvents(body, 'none')
      }
    }
    const isFinished = computed(() => {
      return privateIndex.value === OnboardingState.FINISHED
    })
    const start = () => setIndex(0)
    const finish = () => {
      setIndex(OnboardingState.FINISHED)
      emit('finish')
    }
    const exit = () => emit('exit')
    expose({
      start,
      finish,
      goToStep: setIndex
    })
    const previous = () => {
      setIndex(current => current - 1)
    }
    const next = () => {
      const next = privateIndex.value + 1
      if (next === props.steps.length) {
        finish()
        return
      }
      setIndex(next)
    }
    const state = computed(() => ({
      step: activeStep,
      options: mergedOptions,
      next,
      previous,
      finish,
      exit,
      isFirstStep: computed(() => privateIndex.value === 0),
      isLastStep: computed(() => privateIndex.value === props.steps.length - 1)
    } as OnboardingState))
    provide(STATE_INJECT_KEY, state)
    return {
      index,
      activeStep,
      next,
      previous,
      isFinished,
      setIndex,
      isFirstStep: state.value.isFirstStep,
      isLastStep: state.value.isLastStep,
      finish,
      exit,
      showStep
    }
  }
})
function useSetElementClassName() {
  const setClassName = ({ element, classList = [] }: { element: Element | null; classList?: string[] }) => {
    if (!element) return;
    element.classList.add(...classList)
  }
  const unsetClassName = ({ element, classList = [] }: { element: Element | null; classList?: string[] }) => {
    if (!element) return;
    element.classList.remove(...classList)
  }
  return { setClassName, unsetClassName }
}
function useSetPointerEvents() {
  const pointerEventsDataAttribute = 'data-v-onboarding-pointer-events'
  const addPointerEvents = (element: HTMLElement, value = 'auto') => {
    if (!element) return;
    const currentPointerEvents = element.style.pointerEvents
    if (currentPointerEvents) {
      element.setAttribute(pointerEventsDataAttribute, currentPointerEvents)
    }
    element.style.setProperty('pointer-events', value)
  }
  const removePointerEvents = (element: HTMLElement) => {
    if (!element) return;
    const storedPointerEvent = element.getAttribute(pointerEventsDataAttribute)
    if (storedPointerEvent) {
      element.style.setProperty('pointer-events', storedPointerEvent)
      element.removeAttribute(pointerEventsDataAttribute)
    } else {
      element.style.removeProperty('pointer-events')
    }
  }
  return { addPointerEvents, removePointerEvents }
}
function useStepHooks(stepOptions: ComputedRef<VOnboardingWrapperOptions>) {
  const { setClassName, unsetClassName } = useSetElementClassName()
  const { addPointerEvents, removePointerEvents } = useSetPointerEvents()

  const beforeHook = (step: StepEntity, options: onBeforeStepOptions) => {
    const element = useGetElement(step.attachTo.element)
    if (stepOptions.value?.overlay?.preventOverlayInteraction) {
      addPointerEvents(element as HTMLElement)
    }
    setClassName({ element, classList: step.attachTo.classList });
    return step.on?.beforeStep?.(options)
  }

  const afterHook = (step: StepEntity, options: onAfterStepOptions) => {
    const element = useGetElement(step.attachTo.element)
    if (stepOptions.value?.overlay?.preventOverlayInteraction) {
      removePointerEvents(element as HTMLElement)
    }
    unsetClassName({ element, classList: step.attachTo.classList });
    return step.on?.afterStep?.(options)
  }

  return { beforeHook, afterHook }
}
</script>
