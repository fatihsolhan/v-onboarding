
import { defaultVOnboardingWrapperOptions } from "@/options/VOnboardingWrapper"
import { SvgOverlayOptions } from "@/types/lib"
import { onMounted, onUnmounted, ref } from "vue"

export default function useSvgOverlay() {
  const path = ref('')
  const target = ref<Element | null>(null)
  const paddingRef = ref<SvgOverlayOptions['padding']>(defaultVOnboardingWrapperOptions.overlay?.padding ?? 0)
  const borderRadiusRef = ref<SvgOverlayOptions['borderRadius']>(defaultVOnboardingWrapperOptions.overlay?.borderRadius ?? 0)

  // ResizeObserver to handle dynamic element size changes
  let resizeObserver: ResizeObserver | null = null

  const onUpdate = () => {
    updatePath(target.value, {
      padding: paddingRef.value,
      borderRadius: borderRadiusRef.value,
    })
  }

  const updatePath = async (element: Element | null, options: Omit<SvgOverlayOptions, 'enabled'> = defaultVOnboardingWrapperOptions.overlay!) => {
    if (!element) return
    const { innerWidth, innerHeight } = window
    const { left, top, width, height } = element.getBoundingClientRect()
    const padding = typeof options.padding === 'number' ? {
      top: options.padding,
      right: options.padding,
      bottom: options.padding,
      left: options.padding,
    } : options.padding
    const radius = typeof options.borderRadius === 'number' ? {
      leftTop: options.borderRadius,
      rightTop: options.borderRadius,
      rightBottom: options.borderRadius,
      leftBottom: options.borderRadius,
    } : options.borderRadius
    const edges = {
      top: top - (padding?.top ?? 0),
      right: left + width + (padding?.right ?? 0),
      bottom: top + height + (padding?.bottom ?? 0),
      left: left - (padding?.left ?? 0),
    }
    const pointsPath = {
      leftTop: `M${edges.left + (radius?.leftTop ?? 0)},${edges.top} Q${edges.left},${edges.top} ${edges.left},${edges.top + (radius?.leftTop ?? 0)}`,
      rightTop: `V${edges.top + (radius?.rightTop ?? 0)} Q${edges.right},${edges.top} ${edges.right - (radius?.rightTop ?? 0)},${edges.top}`,
      rightBottom: `H${edges.right - (radius?.rightBottom ?? 0)} Q${edges.right},${edges.bottom} ${edges.right},${edges.bottom - (radius?.rightBottom ?? 0)}`,
      leftBottom: `V${edges.bottom - (radius?.leftBottom ?? 0)} Q${edges.left},${edges.bottom} ${edges.left + (radius?.leftBottom ?? 0)},${edges.bottom}`
    }
    path.value = `
      M${innerWidth},${innerHeight}
      H0V0
      H${innerWidth}V${innerHeight}
      Z
      ${pointsPath.leftTop}
      ${pointsPath.leftBottom}
      ${pointsPath.rightBottom}
      ${pointsPath.rightTop}
      Z
    `

    // Update ResizeObserver when target element changes
    if (target.value !== element) {
      if (resizeObserver && target.value) {
        resizeObserver.unobserve(target.value)
      }
      if (resizeObserver && element) {
        resizeObserver.observe(element)
      }
    }

    target.value = element
    paddingRef.value = padding
    borderRadiusRef.value = radius
  }

  onMounted(() => {
    // Use capture: true to catch scroll events from nested scrollable elements
    window.addEventListener('scroll', onUpdate, { capture: true })
    window.addEventListener('resize', onUpdate)

    // Initialize ResizeObserver to handle dynamic element size changes
    resizeObserver = new ResizeObserver(() => {
      onUpdate()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onUpdate, { capture: true })
    window.removeEventListener('resize', onUpdate)

    // Cleanup ResizeObserver
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

  return {
    path,
    updatePath
  }
}
