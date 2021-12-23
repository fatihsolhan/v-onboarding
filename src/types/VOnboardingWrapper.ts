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
  popper: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      }
    ]
  } as VOnboardingWrapperOptions["popper"],
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
