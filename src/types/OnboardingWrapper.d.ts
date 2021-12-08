import type { createPopper } from "@popperjs/core/lib/createPopper";

export interface OnboardingWrapperOptions {
  popper?: Parameters<typeof createPopper>[2]
  disableOverlay?: boolean
  scrollToStep?: {
    enabled?: boolean
    options?: ScrollIntoViewOptions
  }
}
