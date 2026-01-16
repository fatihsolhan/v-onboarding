# Props

## VOnboardingWrapper Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Step[]` | Required | Array of step configurations |
| `options` | `WrapperOptions` | `{}` | Global options for all steps |

### Example

```vue
<template>
  <VOnboardingWrapper
    ref="wrapper"
    :steps="steps"
    :options="globalOptions"
    @finish="onFinish"
    @exit="onExit"
  />
</template>
```

## Global Options

Options passed to the wrapper apply to all steps (can be overridden per-step):

```ts
const globalOptions = {
  popper: {
    placement: 'bottom'
  },
  overlay: {
    enabled: true,
    padding: 8,
    borderRadius: 4
  },
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center'
    }
  },
  autoFinishByExit: true,
  disableInteraction: true,
  hideButtons: {
    previous: false,
    next: false
  },
  labels: {
    previousButton: 'Previous',
    nextButton: 'Next',
    finishButton: 'Finish'
  }
}
```

## Options Reference

### `popper`

Popper.js configuration for tooltip positioning.

```ts
{
  popper: {
    placement: 'bottom',  // 'top' | 'bottom' | 'left' | 'right' | 'auto' | etc.
    modifiers: [
      { name: 'offset', options: { offset: [0, 12] } }
    ]
  }
}
```

### `overlay`

SVG overlay configuration.

```ts
{
  overlay: {
    enabled: true,        // Show/hide overlay
    padding: 8,           // Padding around highlighted element
    borderRadius: 4       // Border radius of highlight cutout
  }
}
```

### `scrollToStep`

Auto-scroll behavior when navigating steps.

```ts
{
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',   // 'smooth' | 'instant' | 'auto'
      block: 'center',      // 'start' | 'center' | 'end' | 'nearest'
      inline: 'nearest'     // 'start' | 'center' | 'end' | 'nearest'
    }
  }
}
```

### `disableInteraction`

When `true`, prevents clicking on elements outside the current step.

```ts
{
  disableInteraction: true
}
```

### `hideButtons`

Hide navigation buttons in the default UI.

```ts
{
  hideButtons: {
    previous: false,
    next: false
  }
}
```

### `labels`

Customize button text in the default UI.

```ts
{
  labels: {
    previousButton: 'Back',
    nextButton: 'Continue',
    finishButton: 'Done'
  }
}
```
