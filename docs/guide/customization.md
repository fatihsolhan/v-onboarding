# Customization

v-onboarding is fully customizable through CSS variables and step options.

## CSS Variables

Override these variables to customize the appearance:

```css
:root {
  /* Overlay */
  --v-onboarding-overlay-fill: black;
  --v-onboarding-overlay-opacity: 0.5;

  /* Step tooltip */
  --v-onboarding-step-arrow-background: white;
  --v-onboarding-step-arrow-size: 10px;
  --v-onboarding-step-z: 20;
}
```

### Overlay Theming

Create different overlay themes:

```css
/* Light overlay for dark backgrounds */
.light-overlay {
  --v-onboarding-overlay-fill: white;
  --v-onboarding-overlay-opacity: 0.1;
}

/* Colored overlay */
.accent-overlay {
  --v-onboarding-overlay-fill: #d4ff00;
  --v-onboarding-overlay-opacity: 0.08;
}
```

Apply themes dynamically using lifecycle hooks:

```ts
const steps = [
  {
    attachTo: { element: '#dark-section' },
    content: { title: 'Dark Section' },
    on: {
      beforeStep: () => {
        document.body.classList.add('light-overlay')
      },
      afterStep: () => {
        document.body.classList.remove('light-overlay')
      }
    }
  }
]
```

## Arrow Styling

Customize the tooltip arrow:

```css
/* Arrow background */
:root {
  --v-onboarding-step-arrow-background: #111111;
}

/* Arrow border */
[data-v-onboarding-wrapper] [data-popper-arrow]::before {
  border-color: #333333 !important;
}
```

## Overlay Padding

Control the space around highlighted elements:

```ts
const steps = [
  {
    attachTo: { element: '#element' },
    options: {
      overlay: {
        padding: 16,        // Padding around element
        borderRadius: 8     // Rounded highlight
      }
    }
  }
]
```

## Popper Placement

Control tooltip position:

```ts
const steps = [
  {
    attachTo: { element: '#element' },
    options: {
      popper: {
        placement: 'right',  // 'top' | 'bottom' | 'left' | 'right'
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 12] }  // [skid, distance]
          }
        ]
      }
    }
  }
]
```

## Scroll Behavior

Configure auto-scrolling:

```ts
const steps = [
  {
    attachTo: { element: '#element' },
    options: {
      scrollToStep: {
        enabled: true,
        options: {
          behavior: 'smooth',   // 'smooth' | 'instant' | 'auto'
          block: 'center',      // 'start' | 'center' | 'end' | 'nearest'
          inline: 'nearest'
        }
      }
    }
  }
]
```

## Disabling Overlay

Hide the overlay for specific steps:

```ts
const steps = [
  {
    attachTo: { element: '#element' },
    options: {
      overlay: {
        enabled: false
      }
    }
  }
]
```
