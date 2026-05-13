<template>
  <div>
    <svg style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; fill: var(--v-onboarding-overlay-fill, black); opacity: var(--v-onboarding-overlay-opacity, 0.5); z-index: var(--v-onboarding-overlay-z, 10); pointer-events: none;">
      <path :d="path" />
    </svg>
    <div v-show="rendered" ref="stepElement" :style="{ visibility: ready ? 'visible' : 'hidden' }" style="position: absolute; z-index: var(--v-onboarding-step-z, 20);">
      <slot v-if="step">
        <div class="v-onboarding-item">
          <div class="v-onboarding-item__header">
            <span v-if="step.content.title" class="v-onboarding-item__header-title">
              {{ step.content.title }}
            </span>
            <button v-if="isButtonVisible.exit" @click="exit" aria-label="Close" class="v-onboarding-item__header-close">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p v-if="step.content.description && step.content.html" class="v-onboarding-item__description" v-html="step.content.description" />
          <p v-else-if="step.content.description" class="v-onboarding-item__description">
            {{ step.content.description }}
          </p>
          <div class="v-onboarding-item__actions">
            <button v-if="!isFirstStep && isButtonVisible.previous" type="button" @click="previous" class="v-onboarding-btn-secondary">
              {{ buttonLabels.previous }}
            </button>
            <button v-if="isButtonVisible.next" type="button" @click="isLastStep ? finish() : next()" class="v-onboarding-btn-primary">
              {{ isLastStep ? buttonLabels.finish : buttonLabels.next }}
            </button>
          </div>
        </div>
      </slot>
      <div data-popper-arrow />
    </div>
  </div>
</template>

<script setup lang="ts">
import { STATE_INJECT_KEY } from '@/types/internal'
import { createPopper, Instance as PopperInstance } from '@popperjs/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import merge from 'lodash.merge'
import { computed, inject, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import useGetElement from '../composables/useGetElement'
import useSvgOverlay from '../composables/useSvgOverlay'

const state = inject(STATE_INJECT_KEY)!
const { step, isFirstStep, isLastStep, options, next, previous, exit: stateExit, finish } = state.value

const ready = ref(false)
const rendered = ref(false)
const stepElement = ref<HTMLElement>()
let popperInstance: PopperInstance | null = null

const mergedOptions = computed(() => merge({}, options?.value, step.value?.options))

const isButtonVisible = computed(() => ({
  previous: !mergedOptions.value.hideButtons?.previous,
  next: !mergedOptions.value.hideButtons?.next,
  exit: !mergedOptions.value.hideButtons?.exit
}))

const buttonLabels = computed(() => ({
  previous: mergedOptions.value?.labels?.previousButton,
  next: mergedOptions.value?.labels?.nextButton,
  finish: mergedOptions.value?.labels?.finishButton,
}))

const { updatePath, path } = useSvgOverlay()

const focusTrap = useFocusTrap(stepElement, { preventScroll: true })

watch(ready, async (isReady) => {
  await nextTick()
  focusTrap.deactivate()
  if (isReady && mergedOptions.value?.overlay?.preventOverlayInteraction) {
    focusTrap.activate()
  }
})

const updatePositions = (element: Element) => {
  popperInstance?.update()
  if (mergedOptions.value?.overlay?.enabled) {
    updatePath(element, {
      padding: mergedOptions.value?.overlay?.padding,
      borderRadius: mergedOptions.value?.overlay?.borderRadius,
    })
  }
}

const waitForScrollEnd = (element: Element, callback: () => void) => {
  const initialRect = element.getBoundingClientRect()
  let done = false

  const finish = () => {
    if (done) return
    done = true
    document.removeEventListener('scrollend', finish, true)
    clearTimeout(detectTimeout)
    clearTimeout(safetyTimeout)
    callback()
  }

  document.addEventListener('scrollend', finish, { capture: true })

  const detectTimeout = setTimeout(() => {
    const rect = element.getBoundingClientRect()
    const moved =
      Math.abs(rect.top - initialRect.top) >= 1 ||
      Math.abs(rect.left - initialRect.left) >= 1

    if (!moved) return finish()

    let lastTop = rect.top
    let lastLeft = rect.left
    let stableFrames = 0

    const poll = () => {
      if (done) return
      const r = element.getBoundingClientRect()
      if (Math.abs(r.top - lastTop) < 1 && Math.abs(r.left - lastLeft) < 1) {
        if (++stableFrames >= 3) return finish()
      } else {
        stableFrames = 0
      }
      lastTop = r.top
      lastLeft = r.left
      requestAnimationFrame(poll)
    }

    requestAnimationFrame(poll)
  }, 100)

  const safetyTimeout = setTimeout(finish, 1500)
}

const attachElement = async () => {
  await nextTick()
  const element = useGetElement(step?.value?.attachTo?.element)
  if (!element) return

  ready.value = false
  rendered.value = false
  await nextTick()
  popperInstance?.destroy()
  popperInstance = null

  const initPopper = async () => {
    rendered.value = true
    await nextTick()
    if (!stepElement.value) return
    popperInstance = createPopper(element, stepElement.value, mergedOptions.value.popper)
    await popperInstance.update()
    updatePositions(element)
    ready.value = true
  }

  const scrollOptions = mergedOptions.value?.scrollToStep
  if (scrollOptions?.enabled) {
    element.scrollIntoView?.(scrollOptions.options)

    if (scrollOptions.options?.behavior === 'smooth') {
      waitForScrollEnd(element, initPopper)
    } else {
      initPopper()
    }
  } else {
    initPopper()
  }
}

watch(step, attachElement, { immediate: true })

onBeforeUnmount(() => {
  popperInstance?.destroy()
  popperInstance = null
})

const exit = () => {
  stateExit()
  if (mergedOptions.value?.autoFinishByExit) finish()
}
</script>
