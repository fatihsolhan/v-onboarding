import { OnboardingWrapperOptions } from "./OnboardingWrapper";

export interface StepEntity {
  content?: {
    title: string;
    description?: string;
  }
  on?: {
    beforeStep?: () => void
    afterStep?: () => void
  },
  attachTo: {
    element: string | (() => Element | null),
    classList?: string[]
  }
  options?: OnboardingWrapperOptions
}


