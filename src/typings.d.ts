import { DefineComponent } from 'vue'
import { StepEntity } from '@/types/StepEntity'
import { VOnboardingWrapperOptions } from '@/types/VOnboardingWrapper'

declare const VOnboardingWrapper: DefineComponent<{
  steps: StepEntity[]
  options?: VOnboardingWrapperOptions
}>

declare const VOnboardingStep: DefineComponent

declare const useVOnboarding: (wrapperRef: any) => {
  start(): void
  finish(): void
  goToStep: (newStepNumber: number | ((currentStepNumber: number) => number)) => void
}

export { VOnboardingWrapperOptions, VOnboardingWrapper, VOnboardingStep, useVOnboarding }
