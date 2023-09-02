import { VOnboardingWrapperOptions } from "@/types/VOnboardingWrapper";

export type AttachableElement = string | (() => Element | null)

export interface StepEntity {
  content?: {
    title: string;
    description?: string;
    html?: boolean
  }
  on?: {
    beforeStep?: () => void | Promise<void>
    afterStep?: () => void | Promise<void>
  },
  attachTo: {
    element: AttachableElement,
    classList?: string[]
  }
  options?: VOnboardingWrapperOptions
}


