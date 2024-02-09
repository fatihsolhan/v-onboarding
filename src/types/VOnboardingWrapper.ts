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
  autoFinishByExit?: boolean
  hideButtons?: {
    previous?: boolean
    next?: boolean
    exit?: boolean
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
  autoFinishByExit: true,
  labels: {
    previousButton: 'Previous',
    nextButton: 'Next',
    finishButton: 'Finish'
  },
  hideButtons: {
    previous: false,
    next: false,
    exit: false
  }
}
