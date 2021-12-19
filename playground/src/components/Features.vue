<template>
  <div class="py-12">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-4">
      <dl class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
        <div :id="`feature-${index + 1}`" class="bg-white rounded-md p-4 filter drop-shadow-sm" v-for="(feature, index) in features" :key="index">
          <dt>
            <div class="flex items-center w-8 h-8">
              <img :src="feature.icon" aria-hidden="true" />
            </div>
            <p class="mt-5 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
          </dt>
          <dd class="mt-2 text-base text-gray-500">
            {{ feature.description }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
const features = [
  {
    name: 'Fully Typed',
    description: "Who doesn't love type-safety? Right ..? Well, even if you aren't fan of type-safety, it's there. We've got you covered.",
    icon: './svg/ts.svg',
  },
  {
    name: 'Customizable',
    description:
      'You can use our existing styles or use your own styling with default slot.',
    icon: './svg/adjustments.svg',
  },
  {
    name: 'A component for your needs',
    description:
      'Do you need more features? Just create an issue on github and lets discuss it together.',
    icon: './svg/heart.svg',
  },
]

export default {
  setup() {
    return {
      features,
    }
  },
}
</script>
