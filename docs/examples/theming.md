# Theming Example

Change overlay and tooltip colors dynamically between steps.

## Code

```vue
<template>
  <div :class="currentTheme">
    <VOnboardingWrapper
      ref="wrapper"
      :steps="steps"
      @finish="clearTheme"
      @exit="clearTheme"
    />

    <!-- Demo content with dark background -->
    <div class="dark-page">
      <section id="hero">
        <h1>Welcome</h1>
      </section>
      <section id="features">
        <h2>Features</h2>
      </section>
      <section id="pricing">
        <h2>Pricing</h2>
      </section>
      <section id="cta">
        <h2>Get Started</h2>
      </section>
    </div>

    <button @click="start">Start Tour</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'

const wrapper = ref(null)
const { start } = useVOnboarding(wrapper)
const currentTheme = ref('')

const setTheme = (theme) => {
  currentTheme.value = theme
}

const clearTheme = () => {
  currentTheme.value = ''
}

const steps = [
  {
    attachTo: { element: '#hero' },
    content: {
      title: 'Welcome',
      description: 'Notice the subtle light overlay on this dark background.'
    },
    on: {
      beforeStep: () => setTheme('theme-default')
    }
  },
  {
    attachTo: { element: '#features' },
    content: {
      title: 'Chartreuse Theme',
      description: 'The overlay changed to a vibrant chartreuse color!'
    },
    on: {
      beforeStep: () => setTheme('theme-accent')
    }
  },
  {
    attachTo: { element: '#pricing' },
    content: {
      title: 'Warm Orange',
      description: 'Now with a warm orange glow. Each step can have its own theme.'
    },
    on: {
      beforeStep: () => setTheme('theme-warm')
    }
  },
  {
    attachTo: { element: '#cta' },
    content: {
      title: 'Cool Cyan',
      description: 'Finishing with a cool cyan vibe. The possibilities are endless!'
    },
    on: {
      beforeStep: () => setTheme('theme-cool')
    }
  }
]
</script>

<style>
/* Base dark page styling */
.dark-page {
  background: #0a0a0a;
  min-height: 100vh;
  color: white;
}

.dark-page section {
  padding: 100px 40px;
  border-bottom: 1px solid #222;
}

/* Default theme - light overlay for dark backgrounds */
.theme-default {
  --v-onboarding-overlay-fill: #f0ece4;
  --v-onboarding-overlay-opacity: 0.12;
}

/* Chartreuse accent theme */
.theme-accent {
  --v-onboarding-overlay-fill: #d4ff00;
  --v-onboarding-overlay-opacity: 0.08;
}

.theme-accent .v-onboarding-item {
  border-color: #d4ff00;
}

.theme-accent .v-onboarding-btn-primary {
  background: #d4ff00;
  color: #000;
}

/* Warm orange theme */
.theme-warm {
  --v-onboarding-overlay-fill: #ff6b35;
  --v-onboarding-overlay-opacity: 0.1;
}

.theme-warm .v-onboarding-item {
  border-color: #ff6b35;
}

.theme-warm .v-onboarding-btn-primary {
  background: #ff6b35;
}

/* Cool cyan theme */
.theme-cool {
  --v-onboarding-overlay-fill: #00d4ff;
  --v-onboarding-overlay-opacity: 0.1;
}

.theme-cool .v-onboarding-item {
  border-color: #00d4ff;
}

.theme-cool .v-onboarding-btn-primary {
  background: #00d4ff;
  color: #000;
}

/* Dark tooltip styling */
.v-onboarding-item {
  background: #111 !important;
  border: 1px solid #333 !important;
  color: #f0ece4 !important;
}

.v-onboarding-item__description {
  color: #888 !important;
}

.v-onboarding-btn-secondary {
  border-color: #333 !important;
  color: #f0ece4 !important;
}
</style>
```

## CSS Variables Reference

| Variable | Description |
|----------|-------------|
| `--v-onboarding-overlay-fill` | Overlay color |
| `--v-onboarding-overlay-opacity` | Overlay opacity (0-1) |
| `--v-onboarding-step-arrow-background` | Arrow color |

## Key Points

1. **Use CSS classes** - Apply theme classes to a parent element
2. **Switch in hooks** - Use `beforeStep` to change themes
3. **Clean up** - Reset theme on `@finish` and `@exit`
4. **Consistent styling** - Theme both overlay and tooltip together
