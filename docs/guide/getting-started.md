# Getting Started

## Installation

::: code-group

```bash [npm]
npm install v-onboarding
```

```bash [yarn]
yarn add v-onboarding
```

```bash [pnpm]
pnpm add v-onboarding
```

:::

## Basic Setup

### 1. Import the component and styles

```ts
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'
```

### 2. Define your steps

```ts
const steps = [
  {
    attachTo: { element: '#step-1' },
    content: {
      title: 'Welcome!',
      description: 'Let us show you around.'
    }
  },
  {
    attachTo: { element: '#step-2' },
    content: {
      title: 'Features',
      description: 'Here are the key features.'
    }
  }
]
```

### 3. Set up the wrapper and composable

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" />

  <!-- Your app content -->
  <button id="step-1">First Element</button>
  <div id="step-2">Second Element</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'

const wrapper = ref(null)
const { start, finish, goToStep } = useVOnboarding(wrapper)

const steps = [
  {
    attachTo: { element: '#step-1' },
    content: { title: 'Welcome!', description: 'Let us show you around.' }
  },
  {
    attachTo: { element: '#step-2' },
    content: { title: 'Features', description: 'Here are the key features.' }
  }
]

// Start the tour when component mounts
onMounted(() => start())
</script>
```

## Composable Methods

The `useVOnboarding` composable provides these methods:

| Method | Description |
|--------|-------------|
| `start()` | Start the tour from the beginning |
| `finish()` | End the tour |
| `goToStep(index)` | Jump to a specific step |

## Next Steps

- [Basic Usage](/guide/basic-usage) - Learn about step configuration
- [Customization](/guide/customization) - Customize the overlay and positioning
- [Custom UI with Slots](/guide/custom-slots) - Build your own step UI
