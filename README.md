<div align="center">

# v-onboarding


**v-onboarding** is a super-slim, fully-typed onboarding component for Vue 3<br />

> **v-onboarding** is a great way to introduce your app to new users, and to help them get familiar with your app's features.


[![Vue Onboarding](./playground/src/demo.gif "Vue Onboarding")](https://v-onboarding.fatihsolhan.com/)

[Installation](#installation) •
[Usage](#usage) •
[Props](#props) •
[Slots](#slots) •
[Exposed Methods](#exposed-methods)
<br />
<br />
  [Demo](https://v-onboarding.fatihsolhan.com/)
</div>

## Installation<a name="installation"></a>

#### npm
```sh
npm install v-onboarding
```
#### Yarn
```sh
yarn add v-onboarding
```
## Usage<a name="usage"></a>


```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps" />
  <div>
    <button id="foo">Update</button>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'
export default defineComponent ({
  components: {
    VOnboardingWrapper
  },
  setup() {
    const wrapper = ref(null)
    const steps = [
      {
        attachTo: {
          el: '#foo'
        },
        content: {
          title: "Welcome!",
          description: "You can use this button update your informations"
        }
      }
    ]

    const { start } = useVOnboarding(wrapper)

    onMounted(() => {
      start()
    })

    return {
      wrapper,
      steps
    }
  }
})
</script>

```

<br />

## useVOnboarding
#### This composition function returns the same methods explained in [Exposed Methods](#exposed-methods)
```vue
<template>
  <VOnboardingWrapper ref="wrapper" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
export default defineComponent ({
  components: {
    VOnboardingWrapper
  },
  setup() {
    const wrapper = ref(null)
    const { start, finish, goToStep } = useVOnboarding(wrapper)
    return {
      wrapper
    }
  }
})
</script>
```

<br />

## Props<a name="props"></a>

### steps<a name="prop-step"></a>

| Name | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `steps` | [Step[]](#prop-step) | **Required**. Onboarding steps |

```js
[
  {
    attachTo: {
      element: "#foo" // or () => document.querySelector("#foo")
      classList: ["attached", "bar"] // optional. Default: []
    },
    content: { // optional
      title: "..."
      description: "" // optional
    },
    on: { // optional
      beforeStep: function() {}, // optional (could be async)
      afterStep: function() {} // optional (could be async)
    },
    options: {} // [Options](#options)
  }
]
```

### options<a name="prop-options"></a>

| Name | Type     | Description                | Default|
| :-------- | :------- | :------------------------- | :-------- |
| `options` | [Object](#prop-options) | **Optional**. Onboarding options | [Default Options](#prop-options-default) |

```js
{
  popper: {} // PopperJS options: https://popper.js.org/docs/v2/constructors/#options,
  disableOverlay: boolean,
  scrollToStep: {
    enabled: boolean,
    options: {} // scrollIntoViewOptions: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  }
}
```

### Default Options<a name="prop-options-default"></a>

```js
{
  popper: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      }
    ]
  },
  disableOverlay: false,
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    }
  }
}
```

- Note that you can override these options in each step

<br />

## Slots<a name="slots"></a>

### default<a name="slots-default"></a>

```vue
<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps">

    <template #default="{ previous, next, step, exit, isFirst, isLast, index }">
      <VOnboardingStep>
        <div class="flex flex-col p-5">
          <div class="flex flex-col bg-white shadow-md p-4 rounded">
            <h3 class="font-medium text-xl">{{ step.content.title }}</h3>
            <p v-if="step.content.description" class="text-sm">{{ step.content.description }}</p>
            <div class="flex items-center space-x-2 mt-4">
              <button v-if="!isFirst" @click="prev" class="flex flex-1 items-center justify-center px-2 py-1 rounded-sm text-gray-600 border-2 border-gray-600 hover:text-white hover:bg-gray-600 duration-200">Previous</button>
              <button @click="next" class="flex flex-1 items-center justify-center px-2 py-1 rounded-sm text-indigo-600 border-2 border-indigo-600 hover:text-white hover:bg-indigo-600 duration-200">{{ isLast ? 'Finish' : 'Next' }}</button>
            </div>
          </div>
        </div>
      </VOnboardingStep>
    <template>

  </VOnboardingWrapper>
</template>
<script>
import { defineComponent } from 'vue'
import { VOnboardingWrapper, VOnboardingStep } from 'v-onboarding'
import 'v-onboarding/dist/style.css'
export default defineComponent({
  components: {
    VOnboardingWrapper,
    VOnboardingStep
  },
  setup() {
    // ...
  }
})
</script>
```

<br />

## Exposed Methods<a name="exposed-methods"></a>

These methods can be accessed through `component ref`

### Example
```vue
<template>
  <VOnboardingWrapper ref="wrapper"/>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { VOnboardingWrapper } from 'v-onboarding'
import 'v-onboarding/dist/style.css'
export default defineComponent({
  components: {
    VOnboardingWrapper
  },
  setup() {
    const wrapper = ref(null)
    onMounted(() => {
      if (wrapper.value) {
        wrapper.value.start() // here
      }
    })

    return {
      wrapper
    }
  }
})
</script>
```


| Name | Usage | Description |
| :-------- | :-------- | :-------- |
| `start` | `start()` |Starts the onboarding |
| `finish` | `finish()` |Finishes the onboarding |
| `goToStep` | `goToStep(2)` or `goToStep(current => current + 1)` | Moves to the specified step number (Starts from 0) |

<br />

## Roadmap

- Write tests
