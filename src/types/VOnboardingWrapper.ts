import type { createPopper } from "@popperjs/core/lib/createPopper";

export interface SvgOverlayOptions {
  enabled?: boolean
  padding?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
  borderRadius?: number | {
    leftTop?: number;
    rightTop?: number;
    rightBottom?: number;
    leftBottom?: number;
  }
}

export interface VOnboardingWrapperOptions {
  popper?: Parameters<typeof createPopper>[2]
  overlay?: SvgOverlayOptions,
  scrollToStep?: {
    enabled?: boolean
    options?: ScrollIntoViewOptions
  },
  show?: {
    previousButton?: boolean
  },
  labels?: {
    previousButton?: string
    nextButton?: string
    finishButton?: string
  }
}

export const defaultVOnboardingWrapperOptions: VOnboardingWrapperOptions = {
  popper: {},
  overlay: {
    enabled: true,
    padding: 0,
    borderRadius: 0,
  },
  scrollToStep: {
    enabled: true,
    options: {
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    }
  },
  labels: {
    previousButton: 'Previous',
    nextButton: 'Next',
    finishButton: 'Finish'
  }
}
