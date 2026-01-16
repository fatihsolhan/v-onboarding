<template>
  <div v-show="show">
    <svg style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; fill: var(--v-onboarding-overlay-fill, black); opacity: var(--v-onboarding-overlay-opacity, 0.5); z-index: var(--v-onboarding-overlay-z, 10); pointer-events: none;">
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
            <button v-if="isButtonVisible.exit" @click="exit" aria-label="Close" class="v-onboarding-item__header-close">
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
            v-if="step.content.description && step.content.html"
            class="v-onboarding-item__description"
            v-html="step.content.description"
          />
          <p
            v-else-if="step.content.description"
            class="v-onboarding-item__description"
          >{{ step.content.description }}</p>
          <div class="v-onboarding-item__actions">
            <button
              v-if="!isFirstStep && isButtonVisible.previous"
              type="button"
              @click="previous"
              class="v-onboarding-btn-secondary"
            >{{ buttonLabels.previous }}</button>
            <button v-if="isButtonVisible.next"
              @click="() => isLastStep ? finish() : next()"
              type="button"
              class="v-onboarding-btn-primary"
            >{{ isLastStep ? buttonLabels.finish : buttonLabels.next }}</button>
          </div>
        </div>
      </slot>
      <div data-popper-arrow />
    </div>
  </div>
</template>
<script lang="ts">
import { OnboardingState, STATE_INJECT_KEY } from '@/types/internal';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import merge from 'lodash.merge';
import { computed, defineComponent, inject, nextTick, onBeforeUnmount, Ref, ref, watch } from 'vue';
import useGetElement from '../composables/useGetElement';
import useSvgOverlay from '../composables/useSvgOverlay';
export default defineComponent({
  name: "VOnboardingStep",
  setup() {
    const show = ref(false)
    let popperInstance: PopperInstance | null = null

    const state = inject(STATE_INJECT_KEY, {} as Ref<OnboardingState>)
    const { step, isFirstStep, isLastStep, options, next, previous, exit: stateExit, finish } = state.value

    const mergedOptions = computed(() => merge({}, options?.value, step.value.options))

    const isButtonVisible = computed(() => {
      return {
        previous: !mergedOptions.value.hideButtons?.previous,
        next: !mergedOptions.value.hideButtons?.next,
        exit: !mergedOptions.value.hideButtons?.exit
      }
    })

    const buttonLabels = computed(() => {
      return {
        previous: mergedOptions.value?.labels?.previousButton,
        next: mergedOptions.value?.labels?.nextButton,
        finish: mergedOptions.value?.labels?.finishButton,
      }
    })

    const { updatePath, path } = useSvgOverlay();

    const stepElement = ref<HTMLElement>();
    const focusTrap = useFocusTrap(stepElement, {
      // Prevent focus trap from scrolling - let scrollToStep handle it
      preventScroll: true
    })
    watch(show, async (value) => {
      await nextTick()
      // deactivate first to prevent potential trapped states
      focusTrap.deactivate()
      if (value && mergedOptions.value?.overlay?.preventOverlayInteraction) {
        focusTrap.activate()
      }
    })
    // Update positions after scroll/resize/navigation
    const updatePositions = (element: Element) => {
      if (popperInstance) {
        popperInstance.update()
      }
      if (mergedOptions.value?.overlay?.enabled) {
        updatePath(element, {
          padding: mergedOptions.value?.overlay?.padding,
          borderRadius: mergedOptions.value?.overlay?.borderRadius,
        });
      }
    }

    // Wait for smooth scroll to complete by monitoring element position
    const waitForScrollEnd = (element: Element, callback: () => void) => {
      let lastTop = element.getBoundingClientRect().top
      let rafId: number
      let stableFrames = 0

      const checkPosition = () => {
        const currentTop = element.getBoundingClientRect().top
        if (Math.abs(currentTop - lastTop) < 1) {
          stableFrames++
          // Wait for position to be stable for 3 frames
          if (stableFrames >= 3) {
            callback()
            return
          }
        } else {
          stableFrames = 0
        }
        lastTop = currentTop
        rafId = requestAnimationFrame(checkPosition)
      }

      rafId = requestAnimationFrame(checkPosition)

      // Timeout fallback after 1 second
      setTimeout(() => {
        cancelAnimationFrame(rafId)
        callback()
      }, 1000)
    }

    const attachElement = async () => {
      await nextTick()
      const element = useGetElement(step?.value?.attachTo?.element);
      if (element && stepElement.value) {
        show.value = true

        // Destroy old popper instance before creating a new one
        if (popperInstance) {
          popperInstance.destroy()
          popperInstance = null
        }
        popperInstance = createPopper(element, stepElement.value, mergedOptions.value.popper);

        if (mergedOptions.value?.scrollToStep?.enabled) {
          element.scrollIntoView?.(mergedOptions.value?.scrollToStep?.options)

          // For smooth scroll, wait for it to complete before final position update
          const scrollBehavior = mergedOptions.value?.scrollToStep?.options?.behavior
          if (scrollBehavior === 'smooth') {
            waitForScrollEnd(element, () => updatePositions(element))
          } else {
            updatePositions(element)
          }
        } else {
          updatePositions(element)
        }
      }
    };
    watch(step, attachElement, { immediate: true })

    // Cleanup popper instance when component unmounts
    onBeforeUnmount(() => {
      if (popperInstance) {
        popperInstance.destroy()
        popperInstance = null
      }
    })

    const exit = () => {
      stateExit()
      if (mergedOptions.value?.autoFinishByExit) {
        finish()
      }
    }

    return {
      stepElement,
      next,
      previous,
      path,
      show,
      step,
      isFirstStep,
      isLastStep,
      exit,
      finish,
      isButtonVisible,
      buttonLabels
    };
  },
})
</script>
