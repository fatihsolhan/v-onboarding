<template>
  <button :class="[bgColor, textColor]" class="cursor-pointer relative duration-200 flex items-center justify-center px-8 py-3 text-base font-medium no-underline border border-transparent rounded-md md:py-3 md:text-lg md:px-10 md:leading-6">
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
export default defineComponent({
  props: {
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary'
    },
  },
  setup(props) {
    const bgColor = computed(() => {
      return props.variant === 'primary' ? 'bg-white hover:bg-gray-300' : 'bg-white bg-opacity-5 hover:bg-opacity-10'
    })
    const textColor = computed(() => {
      return props.variant === 'primary' ? 'text-black' : 'text-gray-300'
    })
    return {
      bgColor,
      textColor
    }
  }
})
</script>
