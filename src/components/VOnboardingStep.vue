<template>
  <div v-show="show">
    <svg style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; opacity: 0.5; z-index: var(--v-onboarding-overlay-z, 10); pointer-events: none;">
      <path :d="path" />
    </svg>
    <div ref="stepElement" style="position: relative; z-index: var(--v-onboarding-step-z, 20);">
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
              v-if="!isFirst && isButtonVisible.previous"
              type="button"
              @click="onPrevious"
              class="v-onboarding-btn-secondary"
            >{{ buttonLabels.previous }}</button>
            <button v-if="isButtonVisible.next"
              @click="onNext"
              type="button"
              class="v-onboarding-btn-primary"
            >{{ isLast ? buttonLabels.finish : buttonLabels.next }}</button>
          </div>
        </div>
      </slot>
      <div data-popper-arrow />
    </div>
  </div>
</template>
<script lang="ts">
import useGetElement from '../composables/useGetElement';
import useSvgOverlay from '../composables/useSvgOverlay';
import { StepEntity } from '../types/StepEntity';
import { VOnboardingWrapperOptions } from '../types/VOnboardingWrapper';
import { createPopper } from '@popperjs/core';
import merge from 'lodash.merge';
import { computed, ComputedRef, defineComponent, inject, onMounted, ref } from 'vue';
export default defineComponent({
  name: "VOnboardingStep",
  setup(_, { slots }) {
    const show = ref(false)
    const nextStep = inject('next-step', () => { });
    const previousStep = inject('previous-step', () => { });
    const exit = inject('exit', () => { });
    const options = inject<ComputedRef<VOnboardingWrapperOptions>>('options')
    const mergedOptions = computed(() => merge({}, options?.value, step.value.options))
    const isFirst = inject<ComputedRef<boolean>>('is-first-step')
    const isLast = inject<ComputedRef<boolean>>('is-last-step')
    const step = inject<ComputedRef<StepEntity>>('step', {} as ComputedRef<StepEntity>);

    const isButtonVisible = computed(() => {
      return {
        previous: !mergedOptions.value.hideButtons?.previous,
        next: !mergedOptions.value.hideButtons?.next
      }
    })

    const buttonLabels = computed(() => {
      return {
        previous: mergedOptions.value?.labels?.previousButton,
        next: mergedOptions.value?.labels?.nextButton,
        finish: mergedOptions.value?.labels?.finishButton,
      }
    })

    const onNext = () => {
      nextStep()
    }
    const onPrevious = () => {
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
        if (mergedOptions.value?.overlay?.enabled) {
          updatePath(element, {
            padding: mergedOptions.value?.overlay?.padding,
            borderRadius: mergedOptions.value?.overlay?.borderRadius,
          });
        }
      }
    };
    const beforeStepStart = async () => {
      attachElement();
    }
    onMounted(beforeStepStart)
    return {
      stepElement,
      onNext,
      onPrevious,
      path,
      show,
      step,
      isFirst,
      isLast,
      exit,
      isButtonVisible,
      buttonLabels
    };
  },
})
</script>
