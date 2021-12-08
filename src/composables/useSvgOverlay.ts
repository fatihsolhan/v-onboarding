import { onUnmounted, ref } from "vue"

export default function useSvgOverlay() {
  const path = ref('')
  const target = ref<Element | null>(null)

  const onScroll = () => {
    updatePath(target.value)
  }
  const updatePath = async (element: Element | null) => {
    if (!element) return
    const { innerWidth, innerHeight } = window
    const { left, top, width, height } = element.getBoundingClientRect()
    path.value = `M${innerWidth},${innerHeight}H0V0H${innerWidth}V${innerHeight}ZM${left},${top}a0,0,0,0,0-0,0V${top + height}a0,0,0,0,0,0,0H${left + width}a0,0,0,0,0,0-0V${top}a0,0,0,0,0-0-0Z`
    target.value = element
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
  }

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })
  return {
    path,
    updatePath
  }
}
