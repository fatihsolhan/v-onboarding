# Custom UI Example

Build a completely custom step interface using slots.

## Code

```vue
<template>
  <div>
    <VOnboardingWrapper ref="wrapper" :steps="steps">
      <template #default="{ step, next, previous, exit, isFirst, isLast, index }">
        <VOnboardingStep>
          <div class="custom-card">
            <!-- Progress indicator -->
            <div class="progress">
              <div
                class="progress-bar"
                :style="{ width: `${((index + 1) / steps.length) * 100}%` }"
              />
            </div>

            <!-- Header -->
            <div class="card-header">
              <span class="step-count">{{ index + 1 }} / {{ steps.length }}</span>
              <button @click="exit" class="close-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="card-body">
              <h3>{{ step.content?.title }}</h3>
              <p>{{ step.content?.description }}</p>
            </div>

            <!-- Actions -->
            <div class="card-footer">
              <button
                v-if="!isFirst"
                @click="previous"
                class="btn btn-secondary"
              >
                ← Back
              </button>
              <button @click="next" class="btn btn-primary">
                {{ isLast ? 'Get Started' : 'Continue →' }}
              </button>
            </div>
          </div>
        </VOnboardingStep>
      </template>
    </VOnboardingWrapper>

    <!-- Demo content -->
    <div id="feature-1" class="feature">Feature 1</div>
    <div id="feature-2" class="feature">Feature 2</div>
    <div id="feature-3" class="feature">Feature 3</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VOnboardingWrapper, VOnboardingStep, useVOnboarding } from 'v-onboarding'

const wrapper = ref(null)
const { start } = useVOnboarding(wrapper)

const steps = [
  {
    attachTo: { element: '#feature-1' },
    content: {
      title: 'Powerful Analytics',
      description: 'Track your metrics in real-time with our advanced analytics dashboard.'
    }
  },
  {
    attachTo: { element: '#feature-2' },
    content: {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with built-in collaboration tools.'
    }
  },
  {
    attachTo: { element: '#feature-3' },
    content: {
      title: 'Smart Automation',
      description: 'Automate repetitive tasks and focus on what matters.'
    }
  }
]

onMounted(() => start())
</script>

<style scoped>
.custom-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 0;
  width: 320px;
  color: white;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  overflow: hidden;
}

.progress {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
}

.progress-bar {
  height: 100%;
  background: white;
  transition: width 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.step-count {
  font-size: 12px;
  opacity: 0.8;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.card-body {
  padding: 0 20px 20px;
}

.card-body h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px;
}

.card-body p {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.5;
  margin: 0;
}

.card-footer {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.1);
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: white;
  color: #667eea;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

/* Hide the default arrow */
.custom-card ~ [data-popper-arrow] {
  display: none;
}

.feature {
  padding: 40px;
  margin: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>
```

## Key Points

1. **Wrap with VOnboardingStep** - Maintains positioning and overlay
2. **Access slot props** - `step`, `next`, `previous`, `exit`, `isFirst`, `isLast`, `index`
3. **Hide default arrow** - Use CSS to hide if not needed
4. **Full flexibility** - Any design, any layout
