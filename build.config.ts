import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/nuxt/module'],
  outDir: 'dist/nuxt',
  externals: ['@nuxt/kit', '@nuxt/schema', 'v-onboarding'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: false
  }
})
