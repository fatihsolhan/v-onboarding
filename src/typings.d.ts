import { DefineComponent, PropType } from 'vue'
import { OnboardingWrapperOptions } from '@/types/OnboardingWrapper'
import { StepEntity } from '@/types/StepEntity'

declare const OnboardingWrapper: DefineComponent<{
  steps: StepEntity[]
  options: PropType<OnboardingWrapperOptions>
}>

export { OnboardingWrapper }
