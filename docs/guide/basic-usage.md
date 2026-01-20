# Basic Usage

## Step Configuration

Each step in your tour is an object with the following structure:

```ts
interface Step {
  attachTo: {
    element: string | (() => Element | null) | Ref<Element | null>  // CSS selector, function, or Vue ref
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

### Using Vue Template Refs

You can pass Vue template refs directly to `attachTo.element`. This is useful when you need to reference elements that don't have a unique selector:

```vue
<template>
  <button ref="myButton">Click me</button>
  <VOnboardingWrapper :steps="steps" />
</template>

<script setup>
import { ref } from 'vue'
import { VOnboardingWrapper } from 'v-onboarding'

const myButton = ref(null)

const steps = [
  {
    attachTo: { element: myButton },
    content: { title: 'Click here' }
  }
]
</script>
```

### Using Getter Functions

For dynamic element resolution, you can use a function that returns an element:

```ts
const steps = [
  {
    attachTo: {
      element: () => document.querySelector('.dynamic-element')
    },
    content: { title: 'Dynamic element' }
  }
]
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
