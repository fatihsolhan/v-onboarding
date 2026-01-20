import { describe, it, expect, vi, beforeAll } from 'vitest'

interface ModuleConfig {
  meta: {
    name: string
    configKey: string
    compatibility: { nuxt: string }
  }
  defaults: {
    components: boolean
    composables: boolean
    css: boolean
  }
  setup: (options: { css: boolean; components: boolean; composables: boolean }, nuxt: MockNuxt) => void
}

interface MockNuxt {
  options: { css: string[] }
}

describe('Nuxt Module', () => {
  const mockAddComponent = vi.fn()
  const mockAddImports = vi.fn()
  let moduleConfig: ModuleConfig

  beforeAll(async () => {
    vi.doMock('@nuxt/kit', () => ({
      defineNuxtModule: (config: ModuleConfig) => {
        moduleConfig = config
        return config
      },
      addComponent: mockAddComponent,
      addImports: mockAddImports
    }))

    await import('@/nuxt/module')
  })

  function createMockNuxt(): MockNuxt {
    return { options: { css: [] } }
  }

  it('should have correct meta configuration', () => {
    expect(moduleConfig.meta).toEqual({
      name: 'v-onboarding',
      configKey: 'vOnboarding',
      compatibility: {
        nuxt: '>=3.0.0'
      }
    })
  })

  it('should have correct default options', () => {
    expect(moduleConfig.defaults).toEqual({
      components: true,
      composables: true,
      css: true
    })
  })

  it('should add CSS when css option is true', () => {
    const nuxt = createMockNuxt()
    moduleConfig.setup({ css: true, components: false, composables: false }, nuxt)

    expect(nuxt.options.css).toContain('v-onboarding/dist/style.css')
  })

  it('should not add CSS when css option is false', () => {
    const nuxt = createMockNuxt()
    moduleConfig.setup({ css: false, components: false, composables: false }, nuxt)

    expect(nuxt.options.css).toHaveLength(0)
  })

  it('should register components when components option is true', () => {
    mockAddComponent.mockClear()
    const nuxt = createMockNuxt()
    moduleConfig.setup({ css: false, components: true, composables: false }, nuxt)

    expect(mockAddComponent).toHaveBeenCalledTimes(2)
    expect(mockAddComponent).toHaveBeenCalledWith({
      name: 'VOnboardingWrapper',
      filePath: 'v-onboarding',
      export: 'VOnboardingWrapper',
      mode: 'client'
    })
    expect(mockAddComponent).toHaveBeenCalledWith({
      name: 'VOnboardingStep',
      filePath: 'v-onboarding',
      export: 'VOnboardingStep',
      mode: 'client'
    })
  })

  it('should not register components when components option is false', () => {
    mockAddComponent.mockClear()
    const nuxt = createMockNuxt()
    moduleConfig.setup({ css: false, components: false, composables: false }, nuxt)

    expect(mockAddComponent).not.toHaveBeenCalled()
  })

  it('should register composables when composables option is true', () => {
    mockAddImports.mockClear()
    const nuxt = createMockNuxt()
    moduleConfig.setup({ css: false, components: false, composables: true }, nuxt)

    expect(mockAddImports).toHaveBeenCalledWith({
      name: 'useVOnboarding',
      as: 'useVOnboarding',
      from: 'v-onboarding'
    })
  })

  it('should not register composables when composables option is false', () => {
    mockAddImports.mockClear()
    const nuxt = createMockNuxt()
    moduleConfig.setup({ css: false, components: false, composables: false }, nuxt)

    expect(mockAddImports).not.toHaveBeenCalled()
  })

  it('should register components as client-only for SSR safety', () => {
    mockAddComponent.mockClear()
    const nuxt = createMockNuxt()
    moduleConfig.setup({ css: false, components: true, composables: false }, nuxt)

    const calls = mockAddComponent.mock.calls as Array<[{ mode: string }]>
    expect(calls).toHaveLength(2)
    for (const call of calls) {
      expect(call[0].mode).toBe('client')
    }
  })
})
