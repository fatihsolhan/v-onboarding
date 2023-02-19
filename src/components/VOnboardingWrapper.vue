<template>
  <div v-if="!isFinished" data-v-onboarding-wrapper>
    <slot :key="index" :step="activeStep" :next="() => toNextStep()" :previous="() => toPreviousStep()"
      :exit="() => finish()" :isFirst="isFirstStep" :isLast="isLastStep" :index="index">
      <VOnboardingStep :key="index" />
    </slot>
  </div>
</template>
<script lang="ts">
import useGetElement from '@/composables/useGetElement';
import merge from 'lodash.merge';
import { computed, defineComponent, PropType, provide, ref, watch } from 'vue';
import VOnboardingStep from '../components/VOnboardingStep.vue';
import type { StepEntity } from '../types/StepEntity';
import { defaultVOnboardingWrapperOptions, VOnboardingWrapperOptions } from '../types/VOnboardingWrapper';
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
  emits: ['exit'],
  setup(props, { expose, emit }) {
    const index = ref(-1)
    const privateIndex = ref(index.value)
    const setIndex = (value: number | ((_: number) => number)) => {
      if (typeof value === 'function') {
        index.value = value(index.value);
      } else {
        index.value = value;
      }
    }
    const { beforeHook, afterHook } = useStepHooks()
    const activeStep = computed<any>(() => props.steps?.[privateIndex.value] || null)
    watch(index, async (newIndex, oldIndex) => {
      const oldStep = props.steps?.[oldIndex]
      if (oldStep) {
        await afterHook(oldStep)
      }
      const newStep = props.steps?.[newIndex]
      if (newStep) {
        await beforeHook(newStep)
      }
      privateIndex.value = newIndex
    })
    const toPreviousStep = () => {
      setIndex(current => current - 1)
    }
    const toNextStep = () => {
      setIndex(current => current + 1)
    }
    const isFinished = computed(() => {
      return privateIndex.value >= props.steps.length || privateIndex.value < 0
    })
    const destroyIsFinishedWatcher = watch(isFinished, (newValue) => {
      if (!newValue) return
      exit()
      destroyIsFinishedWatcher()
    })
    const start = () => {
      setIndex(0)
    }
    const finish = () => {
      setIndex(-1)
    }
    const exit = () => {
      finish(),
      emit('exit')
    }
    expose({
      start,
      finish,
      goToStep: setIndex
    })

    const mergedOptions = computed(() => merge({}, defaultVOnboardingWrapperOptions, props.options))
    provide('options', mergedOptions)
    provide('step', activeStep);
    provide('next-step', toNextStep);
    provide('previous-step', toPreviousStep);
    provide('exit', exit);
    const isFirstStep = computed(() => privateIndex.value === 0)
    const isLastStep = computed(() => privateIndex.value === props.steps.length - 1)
    provide('is-first-step', isFirstStep);
    provide('is-last-step', isLastStep);
    return {
      index,
      activeStep,
      toPreviousStep,
      toNextStep,
      isFinished,
      setIndex,
      isFirstStep,
      isLastStep,
      finish
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
  const beforeHook = (step: StepEntity) => {
    unsetClassName({ element: useGetElement(step.attachTo.element), classList: step.attachTo.classList });
    return step.on?.beforeStep?.()
  }

  const afterHook = (step: StepEntity) => {
    setClassName({ element: useGetElement(step.attachTo.element), classList: step.attachTo.classList });
    return step.on?.afterStep?.()
  }

  return { beforeHook, afterHook }
}
</script>
