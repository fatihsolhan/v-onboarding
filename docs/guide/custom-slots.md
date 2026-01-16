# Custom UI with Slots

Build completely custom step interfaces using Vue slots.

## Default Slot

The `VOnboardingWrapper` provides a default slot with full access to step data and navigation:

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next, previous, exit, isFirst, isLast, index }">
      <!-- Your custom UI here -->
    </template>
  </VOnboardingWrapper>
</template>
```

### Slot Props

| Prop | Type | Description |
|------|------|-------------|
| `step` | `Step` | Current step configuration |
| `next` | `() => void` | Go to next step (or finish if last) |
| `previous` | `() => void` | Go to previous step |
| `exit` | `() => void` | Exit the tour |
| `isFirst` | `boolean` | Is this the first step? |
| `isLast` | `boolean` | Is this the last step? |
| `index` | `number` | Current step index (0-based) |

## Using VOnboardingStep

::: warning Important
When using custom slot content, wrap it with `VOnboardingStep` to maintain proper positioning and overlay functionality.
:::

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next, previous, exit, isFirst, isLast, index }">
      <VOnboardingStep>
        <!-- Custom content goes inside VOnboardingStep -->
        <div class="my-custom-tooltip">
          <h3>{{ step.content?.title }}</h3>
          <p>{{ step.content?.description }}</p>
          <button @click="next">
            {{ isLast ? 'Finish' : 'Next' }}
          </button>
        </div>
      </VOnboardingStep>
    </template>
  </VOnboardingWrapper>
</template>

<script setup>
import { VOnboardingWrapper, VOnboardingStep } from 'v-onboarding'
</script>
```

## Conditional Custom UI

Show custom UI for specific steps only:

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next, previous, exit, isFirst, isLast, index }">
      <!-- Custom UI for step 3 -->
      <VOnboardingStep v-if="index === 2">
        <MySpecialTooltip
          :title="step.content?.title"
          @next="next"
          @close="exit"
        />
      </VOnboardingStep>

      <!-- Default UI for other steps -->
      <VOnboardingStep v-else />
    </template>
  </VOnboardingWrapper>
</template>
```

## Complete Custom Example

Here's a full example with a completely custom design:

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">
    <template #default="{ step, next, previous, exit, isFirst, isLast, index }">
      <VOnboardingStep>
        <div class="custom-tooltip">
          <!-- Header -->
          <div class="tooltip-header">
            <span class="step-badge">Step {{ index + 1 }}</span>
            <button @click="exit" class="close-btn">×</button>
          </div>

          <!-- Content -->
          <h3 class="tooltip-title">{{ step.content?.title }}</h3>
          <p class="tooltip-description">{{ step.content?.description }}</p>

          <!-- Progress -->
          <div class="progress-dots">
            <span
              v-for="(_, i) in steps"
              :key="i"
              :class="['dot', { active: i === index }]"
            />
          </div>

          <!-- Actions -->
          <div class="tooltip-actions">
            <button v-if="!isFirst" @click="previous" class="btn-secondary">
              Back
            </button>
            <button @click="next" class="btn-primary">
              {{ isLast ? 'Done' : 'Continue' }}
            </button>
          </div>
        </div>
      </VOnboardingStep>
    </template>
  </VOnboardingWrapper>
</template>

<style scoped>
.custom-tooltip {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 320px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.step-badge {
  background: #d4ff00;
  color: #000;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.tooltip-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.tooltip-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.progress-dots {
  display: flex;
  gap: 6px;
  margin: 16px 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
}

.dot.active {
  background: #d4ff00;
}

.tooltip-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-primary {
  flex: 1;
  padding: 10px 20px;
  background: #d4ff00;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}
</style>
```

## Hiding the Arrow

For custom designs that don't need the pointer arrow:

```css
/* Hide arrow for custom tooltip */
.custom-tooltip ~ [data-popper-arrow] {
  display: none;
}
```

Or style it to match your design:

```css
.custom-tooltip ~ [data-popper-arrow]::before {
  background: white !important;
  border: none !important;
}
```
