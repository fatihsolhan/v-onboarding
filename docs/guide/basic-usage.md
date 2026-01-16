# Basic Usage

## Step Configuration

Each step in your tour is an object with the following structure:

```ts
interface Step {
  attachTo: {
    element: string | HTMLElement  // CSS selector or element reference
  }
  content?: {
    title?: string
    description?: string
  }
  options?: StepOptions
  on?: {
    beforeStep?: () => void | Promise<void>
    afterStep?: () => void | Promise<void>
  }
}
```

## Attaching to Elements

### Using CSS Selectors

```ts
const steps = [
  {
    attachTo: { element: '#my-button' },
    content: { title: 'Click here' }
  },
  {
    attachTo: { element: '.nav-item:first-child' },
    content: { title: 'Navigation' }
  }
]
```

### Using Element References

```vue
<template>
  <button ref="myButton">Click me</button>
</template>

<script setup>
import { ref } from 'vue'

const myButton = ref(null)

const steps = [
  {
    attachTo: { element: myButton },
    content: { title: 'Click here' }
  }
]
</script>
```

## Step Options

Customize individual step behavior:

```ts
const steps = [
  {
    attachTo: { element: '#element' },
    content: { title: 'Hello' },
    options: {
      // Popper.js placement
      popper: {
        placement: 'bottom'  // 'top' | 'bottom' | 'left' | 'right' | etc.
      },
      // Scroll behavior
      scrollToStep: {
        enabled: true,
        options: {
          behavior: 'smooth',
          block: 'center'
        }
      },
      // Overlay customization
      overlay: {
        enabled: true,
        padding: 8,
        borderRadius: 4
      }
    }
  }
]
```

## Lifecycle Hooks

Run code before or after each step:

```ts
const steps = [
  {
    attachTo: { element: '#dashboard' },
    content: { title: 'Dashboard' },
    on: {
      beforeStep: async () => {
        // Load data before showing this step
        await fetchDashboardData()
      },
      afterStep: () => {
        // Track analytics when user leaves this step
        analytics.track('tour_step_completed', { step: 'dashboard' })
      }
    }
  }
]
```

## Events

Listen to tour events on the wrapper:

```vue
<template>
  <VOnboardingWrapper
    ref="wrapper"
    :steps="steps"
    @finish="onFinish"
    @exit="onExit"
  />
</template>

<script setup>
const onFinish = () => {
  console.log('Tour completed!')
}

const onExit = (currentIndex) => {
  console.log('Tour exited at step:', currentIndex)
}
</script>
```
