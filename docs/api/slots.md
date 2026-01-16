# Slots

v-onboarding provides slots for complete UI customization.

## Default Slot

The main slot for customizing step appearance.

### Slot Props

| Prop | Type | Description |
|------|------|-------------|
| `step` | `Step` | Current step configuration |
| `next` | `() => void` | Navigate to next step |
| `previous` | `() => void` | Navigate to previous step |
| `exit` | `() => void` | Exit the tour |
| `isFirst` | `boolean` | Is current step the first? |
| `isLast` | `boolean` | Is current step the last? |
| `index` | `number` | Current step index (0-based) |

### Basic Usage

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next, previous, exit, isFirst, isLast, index }">
      <VOnboardingStep>
        <div class="my-tooltip">
          <h3>{{ step.content?.title }}</h3>
          <p>{{ step.content?.description }}</p>

          <div class="actions">
            <button v-if="!isFirst" @click="previous">Back</button>
            <button @click="next">{{ isLast ? 'Finish' : 'Next' }}</button>
          </div>
        </div>
      </VOnboardingStep>
    </template>
  </VOnboardingWrapper>
</template>
```

## VOnboardingStep

When using custom slot content, wrap it with `VOnboardingStep` to maintain:

- Popper.js positioning
- SVG overlay functionality
- Proper z-index stacking

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next, index }">
      <!-- Always wrap custom content with VOnboardingStep -->
      <VOnboardingStep>
        <MyCustomTooltip :step="step" @next="next" />
      </VOnboardingStep>
    </template>
  </VOnboardingWrapper>
</template>

<script setup>
import { VOnboardingWrapper, VOnboardingStep } from 'v-onboarding'
</script>
```

## Conditional Rendering

Show custom UI for specific steps:

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next, previous, exit, isFirst, isLast, index }">
      <!-- Special design for step 3 -->
      <VOnboardingStep v-if="index === 2">
        <SpecialWelcomeCard :step="step" @continue="next" />
      </VOnboardingStep>

      <!-- Default UI for others -->
      <VOnboardingStep v-else />
    </template>
  </VOnboardingWrapper>
</template>
```

## Without VOnboardingStep

If you need complete control and want to handle positioning yourself:

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next }">
      <!-- No VOnboardingStep wrapper - you handle positioning -->
      <Teleport to="body">
        <div class="my-modal-overlay">
          <div class="my-modal">
            {{ step.content?.title }}
            <button @click="next">Continue</button>
          </div>
        </div>
      </Teleport>
    </template>
  </VOnboardingWrapper>
</template>
```

::: warning
Without `VOnboardingStep`, you lose automatic positioning and the SVG overlay.
:::
