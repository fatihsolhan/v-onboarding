export default function useVOnboarding(wrapperRef: any) {
  const start = () => wrapperRef?.value?.start()
  const finish = () => wrapperRef?.value?.finish()
  const exit = () => wrapperRef?.value?.exit()
  const goToStep = (newStepNumber: number | ((currentStepNumber: number) => number)) => wrapperRef?.value?.goToStep(newStepNumber)
  return {
    start,
    finish,
    exit,
    goToStep
  }
}
