# Steps Configuration

## Step Interface

```ts
interface Step {
  attachTo: {
    element: string | (() => Element | null) | Ref<Element | null | undefined>
  }
  content?: {
    title?: string
    description?: string
  }
  options?: StepOptions
  on?: {
    beforeStep?: (options: HookOptions) => void | Promise<void>
    afterStep?: (options: HookOptions) => void | Promise<void>
  }
}
```

## Properties

### `attachTo` (required)

Specifies which element the step tooltip should point to.

```ts
// CSS Selector
{ attachTo: { element: '#my-element' } }

// Vue template ref
const buttonRef = ref(null)
{ attachTo: { element: buttonRef } }

// Getter function (for dynamic elements)
{ attachTo: { element: () => document.querySelector('.dynamic-element') } }
```

### `content`

Content displayed in the default tooltip UI.

```ts
{
  content: {
    title: 'Welcome!',
    description: 'This is a detailed description of this step.'
  }
}
```

::: tip
When using custom slots, you can add any properties to `content` and access them via `step.content` in your template.
:::

```ts
// Custom content properties
{
  content: {
    title: 'Welcome',
    description: 'Description here',
    icon: 'rocket',           // Custom property
    videoUrl: 'https://...',  // Custom property
    metadata: { ... }         // Custom property
  }
}
```

### `options`

Step-specific options that override global options.

```ts
{
  options: {
    popper: { placement: 'right' },
    overlay: { padding: 16 },
    scrollToStep: { enabled: false }
  }
}
```

### `on`

Lifecycle hooks for the step.

```ts
{
  on: {
    beforeStep: async ({ index, step, direction }) => {
      // Runs before this step is shown
      await loadData()
    },
    afterStep: ({ index, step, direction }) => {
      // Runs after leaving this step
      trackAnalytics()
    }
  }
}
```

## Complete Example

```ts
const steps = [
  {
    attachTo: { element: '#welcome-button' },
    content: {
      title: 'Welcome to Our App',
      description: 'Let us show you around!'
    },
    options: {
      popper: { placement: 'bottom' }
    }
  },
  {
    attachTo: { element: '#dashboard-link' },
    content: {
      title: 'Dashboard',
      description: 'View your analytics and metrics here.'
    },
    options: {
      popper: { placement: 'right' },
      scrollToStep: {
        enabled: true,
        options: { behavior: 'smooth', block: 'center' }
      }
    },
    on: {
      beforeStep: async () => {
        await preloadDashboardData()
      }
    }
  },
  {
    attachTo: { element: '#settings-menu' },
    content: {
      title: 'Settings',
      description: 'Customize your experience.'
    },
    options: {
      overlay: { padding: 12, borderRadius: 8 }
    },
    on: {
      afterStep: () => {
        analytics.track('onboarding_completed')
      }
    }
  }
]
```
