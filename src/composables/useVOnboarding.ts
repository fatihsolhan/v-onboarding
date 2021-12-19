import type OnboardingWrapper from "@/components/OnboardingWrapper.vue";
import { ComponentPublicInstance, Ref } from "vue";
export default function useVOnboarding(wrapperRef: Ref<ComponentPublicInstance<typeof OnboardingWrapper>> | null) {
  const start = () => wrapperRef?.value?.start()
  const finish = () => wrapperRef?.value?.finish()
  const goToStep = (value: number) => wrapperRef?.value?.goToStep(value)
  return {
    start,
    finish,
    goToStep
  }
}
