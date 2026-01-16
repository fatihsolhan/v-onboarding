import { VOnboardingWrapperOptions } from "../types/lib/VOnboardingWrapper";

export const defaultVOnboardingWrapperOptions: VOnboardingWrapperOptions = {
  popper: {
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: 8, // Prevent arrow from touching corners
        },
      },
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
          tether: false, // Allow tooltip to detach when reference is larger than viewport
          altAxis: true, // Also prevent overflow on cross-axis
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
