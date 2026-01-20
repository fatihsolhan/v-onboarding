import { addComponent, addImports, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  /** @default true */
  components?: boolean
  /** @default true */
  composables?: boolean
  /** @default true */
  css?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'v-onboarding',
    configKey: 'vOnboarding',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    components: true,
    composables: true,
    css: true
  },
  setup(options, nuxt) {
    if (options.css) {
      nuxt.options.css.push('v-onboarding/dist/style.css')
    }

    if (options.components) {
      addComponent({
        name: 'VOnboardingWrapper',
        filePath: 'v-onboarding',
        export: 'VOnboardingWrapper',
        mode: 'client'
      })

      addComponent({
        name: 'VOnboardingStep',
        filePath: 'v-onboarding',
        export: 'VOnboardingStep',
        mode: 'client'
      })
    }

    if (options.composables) {
      addImports({
        name: 'useVOnboarding',
        as: 'useVOnboarding',
        from: 'v-onboarding'
      })
    }
  }
})
