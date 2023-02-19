import { ComputedRef, InjectionKey, Ref } from "vue";
import { StepEntity } from "./StepEntity";
import { VOnboardingWrapperOptions } from "./VOnboardingWrapper";

export interface OnboardingState {
  step: ComputedRef<StepEntity>;
  options: ComputedRef<VOnboardingWrapperOptions>;
  next: () => void;
  previous: () => void;
  finish: () => void;
  exit: () => void;
  isFirstStep: ComputedRef<boolean>;
  isLastStep: ComputedRef<boolean>;

}
export const STATE_INJECT_KEY = Symbol('onboardingState') as InjectionKey<Ref<OnboardingState>>

export const OnboardingState = {
  IDLE: -1,
  FINISHED: -2
}
