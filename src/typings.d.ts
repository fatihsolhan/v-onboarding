import { StepEntity } from '@/types/StepEntity'
import { VOnboardingWrapperOptions } from '@/types/VOnboardingWrapper'
import { DefineComponent, PropType } from 'vue'

declare const VOnboardingWrapper: DefineComponent<{
  steps: StepEntity[]
  options?: PropType<VOnboardingWrapperOptions>
}>

declare const VOnboardingStep: DefineComponent

declare const useVOnboarding: (wrapperRef: any) => {
  start(): void
  finish(): void
  goToStep: (newStepNumber: number | ((currentStepNumber: number) => number)) => void
}

export { VOnboardingWrapper, VOnboardingStep, useVOnboarding }
