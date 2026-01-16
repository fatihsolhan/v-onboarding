# Lifecycle Hooks

Hooks allow you to run code at specific points during the tour.

## Step Hooks

### `beforeStep`

Runs before a step is displayed. Can be async.

```ts
{
  on: {
    beforeStep: async ({ index, step, direction }) => {
      // Load data
      await fetchData()

      // Update UI state
      setActiveSection('dashboard')

      // Track analytics
      analytics.track('step_viewed', { step: index })
    }
  }
}
```

### `afterStep`

Runs after leaving a step. Can be async.

```ts
{
  on: {
    afterStep: ({ index, step, direction }) => {
      // Cleanup
      closeModals()

      // Track completion
      analytics.track('step_completed', { step: index })
    }
  }
}
```

## Hook Parameters

Both hooks receive an options object:

```ts
interface HookOptions {
  index: number      // Current step index
  step: Step         // Current step configuration
  direction: 'forward' | 'backward'  // Navigation direction
}
```

## Common Use Cases

### Loading Data

```ts
{
  attachTo: { element: '#user-profile' },
  content: { title: 'Your Profile' },
  on: {
    beforeStep: async () => {
      await userStore.fetchProfile()
    }
  }
}
```

### Theme Switching

```ts
{
  attachTo: { element: '#dark-section' },
  on: {
    beforeStep: () => {
      document.body.classList.add('light-overlay-theme')
    },
    afterStep: () => {
      document.body.classList.remove('light-overlay-theme')
    }
  }
}
```

### Analytics

```ts
{
  attachTo: { element: '#cta-button' },
  on: {
    beforeStep: ({ index }) => {
      analytics.track('onboarding_step', { step: index + 1 })
    },
    afterStep: ({ index, direction }) => {
      if (direction === 'forward') {
        analytics.track('onboarding_step_completed', { step: index + 1 })
      }
    }
  }
}
```

### UI State Management

```ts
{
  attachTo: { element: '#sidebar-menu' },
  on: {
    beforeStep: () => {
      // Ensure sidebar is open
      sidebarStore.open()
    }
  }
}
```

## Error Handling

Errors in hooks won't break the tour. Consider adding try-catch for critical operations:

```ts
{
  on: {
    beforeStep: async () => {
      try {
        await criticalOperation()
      } catch (error) {
        console.error('Hook failed:', error)
        // Tour continues regardless
      }
    }
  }
}
```
