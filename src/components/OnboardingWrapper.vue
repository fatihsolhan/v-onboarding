<template>
  <div v-if="!isFinished">
  <slot :key="index" :step="activeStep" :next="() => toNextStep()" :previous="() => toPreviousStep()" :exit="() => setIndex(-1)" :isFirst="isFirstStep" :isLast="isLastStep" :index="index">
    <OnboardingStep :key="index" />
    </slot>
  </div>
</template>
<script lang="ts">
import { defaultOnboardingWrapperOptions, OnboardingWrapperOptions } from '@/types/OnboardingWrapper';
import merge from 'lodash.merge';
import { computed, defineComponent, PropType, provide, ref } from 'vue';
import OnboardingStep from '@/components/OnboardingStep.vue';
import type { StepEntity } from '@/types/StepEntity';
export default defineComponent({
  name: 'VueOnboardingWrapper',
  components: {
    OnboardingStep
  },
  props: {
    steps: {
      type: Array as PropType<StepEntity[]>,
      default: () => []
    },
    options: {
      type: Object as PropType<OnboardingWrapperOptions>,
      default: () => ({})
    }
  },
  setup(props, { expose }) {
    const index = ref(-1)
    const setIndex = (value: number | ((_: number) => number)) => {
      if (typeof value === 'function') {
        index.value = value(index.value);
      } else {
        index.value = value;
      }
    }
    const activeStep = computed<any>(() => props.steps?.[index.value] || null)
    const toPreviousStep = () => {
      setIndex(index.value - 1)
    }
    const toNextStep = () => {
      setIndex(index.value + 1)
    }
    const isFinished = computed(() => {
      return index.value >= props.steps.length || index.value < 0
    })
    const start = () => {
      setIndex(0)
    }
    const finish = () => {
      setIndex(-1)
    }
    expose({
      start,
      finish,
      goToStep: (value: number) => setIndex(value)
    })

    const mergedOptions = computed(() => merge({}, defaultOnboardingWrapperOptions, props.options))
    provide('options', mergedOptions)
    provide('step', activeStep);
    provide('next-step', toNextStep);
    provide('previous-step', toPreviousStep);
    provide('exit', () => finish());
    const isFirstStep = computed(() => index.value === 0)
    const isLastStep = computed(() => index.value === props.steps.length - 1)
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
    }
  }
})
</script>
