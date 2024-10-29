
import { defaultVOnboardingWrapperOptions } from "@/options/VOnboardingWrapper"
import { SvgOverlayOptions } from "@/types/lib"
import { onMounted, onUnmounted, ref } from "vue"

export default function useSvgOverlay() {
  const path = ref('')
  const target = ref<Element | Element[] | null>(null)
  const paddingRef = ref<SvgOverlayOptions['padding']>(defaultVOnboardingWrapperOptions.overlay?.padding ?? 0)
  const borderRadiusRef = ref<SvgOverlayOptions['borderRadius']>(defaultVOnboardingWrapperOptions.overlay?.borderRadius ?? 0)

  const onScroll = () => {
    updatePath(target.value, {
      padding: paddingRef.value,
      borderRadius: borderRadiusRef.value,
    })
  }
  const updatePath = async (element: Element | Element[] | null, options: Omit<SvgOverlayOptions, 'enabled'> = defaultVOnboardingWrapperOptions.overlay!) => {
    if (!element) return
    const { innerWidth, innerHeight } = window
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

    let tmpPath = `
    M${innerWidth},${innerHeight}
    H0V0
    H${innerWidth}V${innerHeight}
    `
  for (const el of (Array.isArray(element) ? element : [element])) {
      const { left, top, width, height } = el.getBoundingClientRect()

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
      tmpPath += `
      Z
        ${pointsPath.leftTop}
        ${pointsPath.leftBottom}
        ${pointsPath.rightBottom}
        ${pointsPath.rightTop}
        Z
      `
  }

  paddingRef.value = padding
  borderRadiusRef.value = radius
  target.value = element
  path.value = tmpPath    
}

  onMounted(() => {
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })
  return {
    path,
    updatePath
  }
}
