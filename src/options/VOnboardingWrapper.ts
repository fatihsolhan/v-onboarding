import { VOnboardingWrapperOptions } from "../types/lib/VOnboardingWrapper";

export const defaultVOnboardingWrapperOptions: VOnboardingWrapperOptions = {
  popper: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'viewport',
          padding: 8,
        },
      },
    ],
  },
  overlay: {
    enabled: true,
    padding: 0,
    borderRadius: 0,
    preventOverlayInteraction: true
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
  },
  hideNextStepDuringHook: false
}
