# Options

Options can be set globally on the wrapper or per-step.

## Popper Options

Configure tooltip positioning using Popper.js options.

```ts
{
  popper: {
    placement: 'bottom',
    modifiers: [
      { name: 'offset', options: { offset: [0, 12] } },
      { name: 'flip', options: { fallbackPlacements: ['top', 'left'] } }
    ]
  }
}
```

### Placement Values

| Value | Description |
|-------|-------------|
| `'top'` | Above the element |
| `'bottom'` | Below the element |
| `'left'` | Left of the element |
| `'right'` | Right of the element |
| `'top-start'` | Above, aligned to start |
| `'top-end'` | Above, aligned to end |
| `'bottom-start'` | Below, aligned to start |
| `'bottom-end'` | Below, aligned to end |
| `'auto'` | Automatically choose best position |

## Overlay Options

Configure the SVG overlay that highlights elements.

```ts
{
  overlay: {
    enabled: true,      // Show/hide overlay
    padding: 8,         // Space around element (px)
    borderRadius: 4     // Rounded corners (px)
  }
}
```

## Scroll Options

Configure automatic scrolling to steps.

```ts
{
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',  // 'smooth' | 'instant' | 'auto'
      block: 'center',     // 'start' | 'center' | 'end' | 'nearest'
      inline: 'nearest'    // 'start' | 'center' | 'end' | 'nearest'
    }
  }
}
```

## Other Options

### `disableInteraction`

Prevents interaction with elements outside the current step.

```ts
{
  disableInteraction: true
}
```

### `hideButtons`

Hide default UI buttons.

```ts
{
  hideButtons: {
    previous: true,  // Hide "Previous" button
    next: false      // Show "Next" button
  }
}
```

### `labels`

Customize button labels.

```ts
{
  labels: {
    previousButton: 'Back',
    nextButton: 'Continue',
    finishButton: 'Got it!'
  }
}
```
