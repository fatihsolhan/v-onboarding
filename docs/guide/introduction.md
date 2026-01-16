# What is v-onboarding?

v-onboarding is a lightweight, fully-typed onboarding component for Vue 3. It helps you create interactive product tours and user guides with minimal effort.

## Features

- **SVG Overlay** - Precise element highlighting with customizable padding and border radius
- **Smart Positioning** - Powered by Popper.js for automatic tooltip placement
- **Fully Customizable** - Complete control with Vue slots for custom UI
- **Lifecycle Hooks** - `beforeStep` and `afterStep` for async operations
- **Focus Management** - Optional focus trap for accessibility
- **TypeScript Ready** - Comprehensive type definitions

## Quick Example

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" />
  <button id="my-button">Click me</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'

const wrapper = ref(null)
const { start } = useVOnboarding(wrapper)

const steps = [
  {
    attachTo: { element: '#my-button' },
    content: {
      title: 'Welcome!',
      description: 'This is your first step.'
    }
  }
]

onMounted(() => start())
</script>
```

## Why v-onboarding?

- **Lightweight** - Minimal bundle size impact
- **Vue 3 Native** - Built specifically for Vue 3 with Composition API
- **No Dependencies Lock-in** - Uses Popper.js which you may already have
- **Flexible** - Works with any UI framework or custom styling
