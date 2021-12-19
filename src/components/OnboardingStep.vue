<template>
  <div v-show="show">
    <svg class="v-onboarding-overlay">
      <path :d="path" />
    </svg>
    <div ref="stepElement" class="v-onboarding-item__wrapper">
      <slot v-if="step">
        <div class="v-onboarding-item">
          <div class="v-onboarding-item__header">
            <span
              v-if="step.content.title"
              class="v-onboarding-item__header-title"
            >{{ step.content.title }}</span>
            <button @click="exit" class="v-onboarding-item__header-close">
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
          <p
            v-if="step.content.description"
            class="v-onboarding-item__description"
          >{{ step.content.description }}</p>
          <div class="v-onboarding-item__actions">
            <button
              v-if="!isFirst"
              type="button"
              @click="onPrevious"
              class="v-onboarding-btn-secondary"
            >Previous</button>
            <button
              @click="onNext"
              type="button"
              class="v-onboarding-btn-primary"
            >{{ isLast ? 'Finish' : 'Next' }}</button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import useGetElement from '@/composables/useGetElement';
import useSvgOverlay from '@/composables/useSvgOverlay';
import { OnboardingWrapperOptions } from '@/types/OnboardingWrapper';
import { StepEntity } from '@/types/StepEntity';
import { createPopper } from '@popperjs/core';
import merge from 'lodash.merge';
import { computed, ComputedRef, defineComponent, inject, onMounted, ref } from 'vue';
export default defineComponent({
  name: "VueOnboardingStep",
  setup() {
    const show = ref(false)
    const nextStep = inject('next-step', () => { });
    const previousStep = inject('previous-step', () => { });
    const exit = inject('exit', () => { });
    const options = inject<ComputedRef<OnboardingWrapperOptions>>('options')
    const mergedOptions = computed(() => merge({}, options?.value, step.value.options))
    const isFirst = inject<ComputedRef<boolean>>('is-first-step')
    const isLast = inject<ComputedRef<boolean>>('is-last-step')

    const step = inject<ComputedRef<StepEntity>>('step', {} as ComputedRef<StepEntity>);
    const onNext = async () => {
      await beforeStepEnd();
      nextStep()
    }
    const onPrevious = async () => {
      await beforeStepEnd();
      previousStep()
    }
    const stepElement = ref<HTMLElement | null>(null);
    const { updatePath, path } = useSvgOverlay();

    const attachElement = () => {
      const element = useGetElement(step?.value?.attachTo?.element);
      if (element && stepElement.value) {
        show.value = true
        if (mergedOptions.value?.scrollToStep?.enabled) {
          element.scrollIntoView(mergedOptions.value?.scrollToStep?.options)
        }
        createPopper(element, stepElement.value, mergedOptions.value.popper);
        if (!mergedOptions.value?.disableOverlay) {
          updatePath(element);
        }
        setTargetElementClassName(element);
      }
    };
    const beforeStepStart = async () => {
      await step?.value?.on?.beforeStep?.();
      attachElement();
    }
    const beforeStepEnd = async () => {
      await step?.value?.on?.afterStep?.();
      unsetTargetElementClassName()
    }

    const setTargetElementClassName = (element = useGetElement(step.value.attachTo.element)) => {
      const classList = step.value.attachTo.classList;
      if (!classList || !element) return;
      element.classList.add(...classList)
    }
    const unsetTargetElementClassName = (element = useGetElement(step.value.attachTo.element)) => {
      const classList = step.value.attachTo.classList;
      if (!classList || !element) return;
      element.classList.remove(...classList)
    }
    onMounted(async () => {
      await beforeStepStart();

    });
    return {
      stepElement,
      onNext,
      onPrevious,
      path,
      show,
      step,
      isFirst,
      isLast,
      exit
    };
  },
})
</script>
