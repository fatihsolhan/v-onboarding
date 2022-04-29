<template>
  <div v-if="cats.length" class="grid grid-cols-2 gap-x-4 gap-y-6" id="cats">
    <template v-for="(cat, index) in cats">
      <div :id="`cat-${index}`"
        class="flex flex-col items-center justify-center border-2 border-white border-solid w-full aspect-video">
        <img class="w-full h-full object-cover" :src="cat.image_link" />
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import CatType from "../../types/CatType";

export default defineComponent({
  props: {
    cats: {
      type: Array as PropType<CatType[]>,
      default: () => []
    }
  }
})
</script>
