# Events

The `VOnboardingWrapper` component emits events during the tour lifecycle.

## Available Events

### `@finish`

Emitted when the tour is completed (user clicks "Finish" on last step).

```vue
<template>
  <VOnboardingWrapper
    ref="wrapper"
    :steps="steps"
    @finish="onFinish"
  />
</template>

<script setup>
const onFinish = () => {
  console.log('Tour completed!')

  // Save completion state
  localStorage.setItem('onboarding_completed', 'true')

  // Track analytics
  analytics.track('onboarding_finished')
}
</script>
```

### `@exit`

Emitted when the tour is exited early (user closes the tour before completing).

```vue
<template>
  <VOnboardingWrapper
    ref="wrapper"
    :steps="steps"
    @exit="onExit"
  />
</template>

<script setup>
const onExit = (currentIndex: number) => {
  console.log('Tour exited at step:', currentIndex)

  // Track where users drop off
  analytics.track('onboarding_exited', {
    step: currentIndex,
    total_steps: steps.length
  })
}
</script>
```

## Example: Complete Event Handling

```vue
<template>
  <VOnboardingWrapper
    ref="wrapper"
    :steps="steps"
    @finish="handleFinish"
    @exit="handleExit"
  />
</template>

<script setup>
import { ref } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'

const wrapper = ref(null)
const { start, finish } = useVOnboarding(wrapper)

const steps = [/* ... */]

const handleFinish = () => {
  // Mark onboarding as complete
  userPreferences.setOnboardingComplete(true)

  // Show success message
  toast.success('Welcome aboard! You\'re all set.')

  // Redirect or update UI
  router.push('/dashboard')
}

const handleExit = (stepIndex: number) => {
  // Ask if user wants to resume later
  if (confirm('Would you like to continue the tour later?')) {
    localStorage.setItem('onboarding_resume_step', stepIndex.toString())
  }
}

// Resume from saved step
onMounted(() => {
  const savedStep = localStorage.getItem('onboarding_resume_step')
  if (savedStep) {
    start(parseInt(savedStep))
    localStorage.removeItem('onboarding_resume_step')
  }
})
</script>
```
