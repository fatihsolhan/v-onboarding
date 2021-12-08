import { OnboardingWrapperOptions } from "../types/OnboardingWrapper";

export const defaultOnboardingWrapperOptions: OnboardingWrapperOptions = {
  popper: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      }
    ]
  } as OnboardingWrapperOptions["popper"],
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
