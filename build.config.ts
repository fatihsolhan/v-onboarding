import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/nuxt/module'],
  externals: ['@nuxt/kit', '@nuxt/schema', 'v-onboarding'],
  declaration: true,
  clean: false,
  rollup: {
    emitCJS: false
  }
})
