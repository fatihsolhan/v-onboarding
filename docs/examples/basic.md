# Basic Tour

A simple onboarding tour with default styling.

## Code

```vue
<template>
  <div>
    <VOnboardingWrapper
      ref="wrapper"
      :steps="steps"
      @finish="onFinish"
    />

    <!-- Your app content -->
    <header>
      <h1 id="welcome">Welcome to My App</h1>
      <nav>
        <button id="dashboard-btn">Dashboard</button>
        <button id="settings-btn">Settings</button>
      </nav>
    </header>

    <main id="main-content">
      <p>Your main content here...</p>
    </main>

    <button @click="startTour">Start Tour</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'

const wrapper = ref(null)
const { start } = useVOnboarding(wrapper)

const steps = [
  {
    attachTo: { element: '#welcome' },
    content: {
      title: 'Welcome!',
      description: 'Thanks for trying our app. Let us show you around.'
    }
  },
  {
    attachTo: { element: '#dashboard-btn' },
    content: {
      title: 'Dashboard',
      description: 'View your stats and analytics here.'
    },
    options: {
      popper: { placement: 'bottom' }
    }
  },
  {
    attachTo: { element: '#settings-btn' },
    content: {
      title: 'Settings',
      description: 'Customize your preferences and account settings.'
    },
    options: {
      popper: { placement: 'bottom' }
    }
  },
  {
    attachTo: { element: '#main-content' },
    content: {
      title: 'Main Content',
      description: 'This is where the magic happens!'
    }
  }
]

const startTour = () => start()

const onFinish = () => {
  alert('Tour completed! Welcome aboard.')
}

// Auto-start for first-time users
onMounted(() => {
  const hasSeenTour = localStorage.getItem('tour_completed')
  if (!hasSeenTour) {
    start()
  }
})
</script>
```

## Key Points

1. **Import styles** - Don't forget `import 'v-onboarding/dist/style.css'`
2. **Create a ref** - The wrapper needs a template ref
3. **Use the composable** - `useVOnboarding(wrapper)` provides `start`, `finish`, `goToStep`
4. **Define steps** - Each step needs `attachTo.element` at minimum
