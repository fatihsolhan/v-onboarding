import { VOnboardingWrapperOptions } from "../types/lib/VOnboardingWrapper";

export const defaultVOnboardingWrapperOptions: VOnboardingWrapperOptions = {
  popper: {
    // Smart positioning to prevent panel from going off-screen
    modifiers: [
      {
        name: 'flip',
        options: {
          // Try these placements in order if the preferred one doesn't fit
          fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          // Keep the panel within the viewport
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
