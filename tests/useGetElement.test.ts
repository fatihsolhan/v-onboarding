import { ref } from 'vue'
import useGetElement from '@/composables/useGetElement'

describe('useGetElement', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should find element by string selector', () => {
    document.body.innerHTML = '<div id="test-element">Test</div>'
    const element = useGetElement('#test-element')
    expect(element).not.toBeNull()
    expect(element?.id).toBe('test-element')
  })

  it('should return null for non-existent selector', () => {
    const element = useGetElement('#does-not-exist')
    expect(element).toBeNull()
  })

  it('should find element using function', () => {
    document.body.innerHTML = '<div id="func-element">Test</div>'
    const element = useGetElement(() => document.getElementById('func-element'))
    expect(element).not.toBeNull()
    expect(element?.id).toBe('func-element')
  })

  it('should return null when function returns null', () => {
    const element = useGetElement(() => null)
    expect(element).toBeNull()
  })

  it('should find element inside shadow DOM', () => {
    // Create a host element with shadow root
    const host = document.createElement('div')
    host.id = 'shadow-host'
    document.body.appendChild(host)

    const shadowRoot = host.attachShadow({ mode: 'open' })
    const shadowElement = document.createElement('div')
    shadowElement.id = 'shadow-element'
    shadowElement.className = 'inside-shadow'
    shadowRoot.appendChild(shadowElement)

    // Should find element inside shadow DOM by ID
    const foundById = useGetElement('#shadow-element')
    expect(foundById).not.toBeNull()
    expect(foundById?.id).toBe('shadow-element')

    // Should find element inside shadow DOM by class
    const foundByClass = useGetElement('.inside-shadow')
    expect(foundByClass).not.toBeNull()
    expect(foundByClass?.className).toBe('inside-shadow')
  })

  it('should find element in nested shadow DOM', () => {
    // Create outer host
    const outerHost = document.createElement('div')
    document.body.appendChild(outerHost)
    const outerShadow = outerHost.attachShadow({ mode: 'open' })

    // Create inner host inside outer shadow
    const innerHost = document.createElement('div')
    outerShadow.appendChild(innerHost)
    const innerShadow = innerHost.attachShadow({ mode: 'open' })

    // Create target element in innermost shadow
    const deepElement = document.createElement('span')
    deepElement.id = 'deep-element'
    innerShadow.appendChild(deepElement)

    const found = useGetElement('#deep-element')
    expect(found).not.toBeNull()
    expect(found?.id).toBe('deep-element')
  })

  it('should prefer regular DOM over shadow DOM', () => {
    // Create element in regular DOM
    const regularElement = document.createElement('div')
    regularElement.id = 'shared-id'
    regularElement.className = 'regular'
    document.body.appendChild(regularElement)

    // Create element with same ID in shadow DOM
    const host = document.createElement('div')
    document.body.appendChild(host)
    const shadowRoot = host.attachShadow({ mode: 'open' })
    const shadowElement = document.createElement('div')
    shadowElement.id = 'shared-id'
    shadowElement.className = 'shadow'
    shadowRoot.appendChild(shadowElement)

    // Should find the regular DOM element first
    const found = useGetElement('#shared-id')
    expect(found?.className).toBe('regular')
  })

  it('should find element from Vue ref with valid element', () => {
    const element = document.createElement('div')
    element.id = 'ref-element'
    document.body.appendChild(element)

    const elementRef = ref<Element | null>(element)
    const found = useGetElement(elementRef)
    expect(found).not.toBeNull()
    expect(found?.id).toBe('ref-element')
  })

  it('should return null when Vue ref has null value', () => {
    const elementRef = ref<Element | null>(null)
    const found = useGetElement(elementRef)
    expect(found).toBeNull()
  })

  it('should return null when Vue ref has undefined value', () => {
    const elementRef = ref<Element | undefined>(undefined)
    const found = useGetElement(elementRef)
    expect(found).toBeNull()
  })

  it('should handle Vue ref that updates', () => {
    const element1 = document.createElement('div')
    element1.id = 'element-1'
    document.body.appendChild(element1)

    const element2 = document.createElement('div')
    element2.id = 'element-2'
    document.body.appendChild(element2)

    const elementRef = ref<Element | null>(element1)

    // First call should return element1
    let found = useGetElement(elementRef)
    expect(found?.id).toBe('element-1')

    // Update ref to element2
    elementRef.value = element2

    // Second call should return element2
    found = useGetElement(elementRef)
    expect(found?.id).toBe('element-2')
  })

  it('should extract $el from Vue component ref', () => {
    const element = document.createElement('div')
    element.id = 'component-root'
    document.body.appendChild(element)

    // Simulate a Vue component instance with $el
    const componentInstance = {
      $el: element,
      $props: {},
      $emit: () => {}
    }

    const componentRef = ref(componentInstance)
    const found = useGetElement(componentRef)
    expect(found).not.toBeNull()
    expect(found?.id).toBe('component-root')
  })

  it('should return null when component ref has no $el', () => {
    const componentInstance = {
      $props: {},
      $emit: () => {}
    }

    const componentRef = ref(componentInstance)
    const found = useGetElement(componentRef)
    expect(found).toBeNull()
  })
})
