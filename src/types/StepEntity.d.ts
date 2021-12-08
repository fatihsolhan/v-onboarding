import { OnboardingWrapperOptions } from "./OnboardingWrapper";

export interface StepEntity {
  content?: {
    title: string;
    description?: string;
  }
  on?: {
    beforeStep?: Function
    afterStep?: Function
  },
  attachTo: {
    element: string | (() => Element | null),
    classList?: string[]
  }
  options?: OnboardingWrapperOptions
}


