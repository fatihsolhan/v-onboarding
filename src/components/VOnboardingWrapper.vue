<template>
  <div v-if="!isFinished" data-v-onboarding-wrapper>
    <slot :key="index" :step="activeStep" :next="next" :previous="previous" :exit="exit" :is-first="isFirstStep" :is-last="isLastStep" :index="index">
      <VOnboardingStep :key="index" />
    </slot>
  </div>
</template>
<script lang="ts">
import VOnboardingStep from '@/components/VOnboardingStep.vue';
import useGetElement from '@/composables/useGetElement';
import { OnboardingState, Direction, STATE_INJECT_KEY } from '@/types/index';
import type { StepEntity, onBeforeStepOptions, onAfterStepOptions } from '@/types/StepEntity';
import { defaultVOnboardingWrapperOptions, VOnboardingWrapperOptions } from '@/types/VOnboardingWrapper';
import merge from 'lodash.merge';
import { computed, defineComponent, PropType, provide, ref, watch } from 'vue';
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
    const index = ref(OnboardingState.IDLE)
    const privateIndex = ref(index.value)
    const setIndex = (value: number | ((_: number) => number)) => {
      if (typeof value === 'function') {
        index.value = value(index.value);
      } else {
        index.value = value;
      }
    }
    const { beforeHook, afterHook } = useStepHooks()
    const activeStep = computed(() => props.steps?.[privateIndex.value])
    watch(index, async (newIndex, oldIndex) => {
      const direction: number = newIndex < oldIndex ? Direction.BACKWARD : Direction.FORWARD
      const globalHookOptions = {
        index: privateIndex.value,
        step: activeStep.value,
        direction: direction,
        isForward: direction === Direction.FORWARD,
        isBackward: direction === Direction.BACKWARD,
      }
      const oldStep = props.steps?.[oldIndex]
      if (oldStep) {
        const afterHookOptions: onAfterStepOptions = {
          ...globalHookOptions,
          // custom afterHookOptions here
        }
        await afterHook(oldStep, afterHookOptions)
      }
      const newStep = props.steps?.[newIndex]
      if (newStep) {
        const beforeHookOptions: onBeforeStepOptions = {
          ...globalHookOptions,
          // custom afterHookOptions here
        }
        await beforeHook(newStep, beforeHookOptions)
      }
      privateIndex.value = newIndex
    })
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
      options: computed(() => merge({}, defaultVOnboardingWrapperOptions, props.options)),
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
      exit
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
function useStepHooks() {
  const { setClassName, unsetClassName } = useSetElementClassName()
  const beforeHook = (step: StepEntity, options: onBeforeStepOptions) => {
    setClassName({ element: useGetElement(step.attachTo.element), classList: step.attachTo.classList });
    return step.on?.beforeStep?.(options)
  }

  const afterHook = (step: StepEntity, options: onAfterStepOptions) => {
    unsetClassName({ element: useGetElement(step.attachTo.element), classList: step.attachTo.classList });
    return step.on?.afterStep?.(options)
  }

  return { beforeHook, afterHook }
}
</script>
