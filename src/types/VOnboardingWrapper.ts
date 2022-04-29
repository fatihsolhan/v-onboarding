import type { createPopper } from "@popperjs/core/lib/createPopper";

export interface VOnboardingWrapperOptions {
  popper?: Parameters<typeof createPopper>[2]
  disableOverlay?: boolean
  scrollToStep?: {
    enabled?: boolean
    options?: ScrollIntoViewOptions
  }
}

export const defaultVOnboardingWrapperOptions: VOnboardingWrapperOptions = {
  popper: {},
  disableOverlay: false,
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    }
  }
}
