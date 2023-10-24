import { VOnboardingWrapperOptions } from "@/types/VOnboardingWrapper";

export type AttachableElement = string | (() => Element | null)

interface onGlobalOptions {
  index: number
  step: StepEntity
  direction: 1 | -1 | number
  isForward: boolean
  isBackward: boolean
}
export type onBeforeStepOptions = onGlobalOptions & {
  // custom options here
}
export type onAfterStepOptions = onGlobalOptions & {
  // custom options here
}

export interface StepEntity {
  content: {
    title: string;
    description?: string;
  }
  on?: {
    beforeStep?: (options?: onBeforeStepOptions) => void | Promise<void>
    afterStep?: (options?: onAfterStepOptions) => void | Promise<void>
  },
  attachTo: {
    element: AttachableElement,
    classList?: string[]
  }
  options?: VOnboardingWrapperOptions
}
