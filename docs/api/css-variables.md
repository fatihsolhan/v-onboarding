# CSS Variables

Customize v-onboarding appearance using CSS custom properties.

## Overlay Variables

### `--v-onboarding-overlay-fill`

The color of the overlay background.

```css
:root {
  --v-onboarding-overlay-fill: black;  /* Default */
}

/* Light overlay for dark backgrounds */
.dark-theme {
  --v-onboarding-overlay-fill: white;
}

/* Colored overlay */
.accent-theme {
  --v-onboarding-overlay-fill: #d4ff00;
}
```

### `--v-onboarding-overlay-opacity`

Opacity of the overlay (0 to 1).

```css
:root {
  --v-onboarding-overlay-opacity: 0.5;  /* Default */
}

/* Subtle overlay */
.subtle {
  --v-onboarding-overlay-opacity: 0.2;
}

/* Strong overlay */
.strong {
  --v-onboarding-overlay-opacity: 0.8;
}
```

## Arrow Variables

### `--v-onboarding-step-arrow-background`

Background color of the tooltip arrow.

```css
:root {
  --v-onboarding-step-arrow-background: white;  /* Default */
}

/* Dark tooltip */
.dark-tooltip {
  --v-onboarding-step-arrow-background: #1a1a1a;
}
```

### `--v-onboarding-step-arrow-width`

Width of the tooltip arrow (horizontal span).

```css
:root {
  --v-onboarding-step-arrow-width: 20px;  /* Default */
}
```

### `--v-onboarding-step-arrow-height`

Height of the tooltip arrow (how far it extends from tooltip).

```css
:root {
  --v-onboarding-step-arrow-height: 10px;  /* Default */
}

/* Larger arrow */
.large-arrow {
  --v-onboarding-step-arrow-width: 28px;
  --v-onboarding-step-arrow-height: 14px;
}
```

## Z-Index Variables

### `--v-onboarding-step-z`

Z-index of the step tooltip.

```css
:root {
  --v-onboarding-step-z: 20;  /* Default */
}

/* Higher z-index for modals */
.above-modals {
  --v-onboarding-step-z: 10000;
}
```

## Theme Examples

### Dark Theme

```css
.dark-onboarding {
  --v-onboarding-overlay-fill: white;
  --v-onboarding-overlay-opacity: 0.1;
  --v-onboarding-step-arrow-background: #1a1a1a;
}
```

### Colorful Theme

```css
.colorful-onboarding {
  --v-onboarding-overlay-fill: #6366f1;
  --v-onboarding-overlay-opacity: 0.15;
  --v-onboarding-step-arrow-background: #6366f1;
}
```

### Minimal Theme

```css
.minimal-onboarding {
  --v-onboarding-overlay-fill: black;
  --v-onboarding-overlay-opacity: 0.3;
  --v-onboarding-step-arrow-width: 16px;
  --v-onboarding-step-arrow-height: 8px;
}
```

## Dynamic Theming

Change themes per-step using lifecycle hooks:

```ts
const themes = ['default', 'accent', 'warm', 'cool']

const steps = [
  {
    attachTo: { element: '#step-1' },
    on: {
      beforeStep: () => {
        document.body.className = 'theme-default'
      }
    }
  },
  {
    attachTo: { element: '#step-2' },
    on: {
      beforeStep: () => {
        document.body.className = 'theme-accent'
      }
    }
  }
]
```

```css
.theme-default {
  --v-onboarding-overlay-fill: black;
  --v-onboarding-overlay-opacity: 0.5;
}

.theme-accent {
  --v-onboarding-overlay-fill: #d4ff00;
  --v-onboarding-overlay-opacity: 0.08;
}

.theme-warm {
  --v-onboarding-overlay-fill: #ff6b35;
  --v-onboarding-overlay-opacity: 0.1;
}

.theme-cool {
  --v-onboarding-overlay-fill: #00d4ff;
  --v-onboarding-overlay-opacity: 0.1;
}
```
