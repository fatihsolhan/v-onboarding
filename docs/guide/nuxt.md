# Nuxt Integration

v-onboarding provides a first-party Nuxt module for seamless integration with Nuxt 3+ applications.

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

## Setup

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['v-onboarding/nuxt']
})
```

That's it. Components, composables, and styles are automatically imported.

## Usage

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" />
  <button id="my-button">Click me</button>
</template>

<script setup>
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

## Configuration

Customize the module behavior in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['v-onboarding/nuxt'],
  vOnboarding: {
    // Auto-import VOnboardingWrapper and VOnboardingStep
    components: true,
    // Auto-import useVOnboarding composable
    composables: true,
    // Include v-onboarding styles
    css: true
  }
})
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `components` | `boolean` | `true` | Auto-import components |
| `composables` | `boolean` | `true` | Auto-import `useVOnboarding` |
| `css` | `boolean` | `true` | Include default styles |

## SSR Considerations

The module registers components as **client-only** to prevent SSR hydration issues. The library uses browser APIs (`window`, `document`, `ResizeObserver`) that aren't available during server-side rendering.

This is handled automatically—no `<ClientOnly>` wrapper needed.

## Manual Setup

If you prefer not to use the module, you can set up manually with a plugin:

```ts
// plugins/v-onboarding.client.ts
import { VOnboardingWrapper, VOnboardingStep } from 'v-onboarding'
import 'v-onboarding/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VOnboardingWrapper', VOnboardingWrapper)
  nuxtApp.vueApp.component('VOnboardingStep', VOnboardingStep)
})
```

Note the `.client.ts` suffix—this ensures the plugin only runs on the client.
