<template>
  <div v-if="!isFinished">
  <slot :key="index" :step="activeStep" :next="() => toNextStep()" :previous="() => toPreviousStep()" :exit="() => finish()" :isFirst="isFirstStep" :isLast="isLastStep" :index="index">
    <VOnboardingStep :key="index" />
    </slot>
  </div>
</template>
<script lang="ts">
import VOnboardingStep from '@/components/VOnboardingStep.vue';
import type { StepEntity } from '@/types/StepEntity';
import { defaultVOnboardingWrapperOptions, VOnboardingWrapperOptions } from '@/types/VOnboardingWrapper';
import merge from 'lodash.merge';
import { computed, defineComponent, PropType, provide, ref } from 'vue';
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
      setIndex(current => current - 1)
    }
    const toNextStep = () => {
      setIndex(current => current + 1)
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
      goToStep: setIndex
    })

    const mergedOptions = computed(() => merge({}, defaultVOnboardingWrapperOptions, props.options))
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
      finish
    }
  }
})
</script>
