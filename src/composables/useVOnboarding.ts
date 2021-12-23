export default function useVOnboarding(wrapperRef: any) {
  const start = () => wrapperRef?.value?.start()
  const finish = () => wrapperRef?.value?.finish()
  const goToStep = (value: number) => wrapperRef?.value?.goToStep(value)
  return {
    start,
    finish,
    goToStep
  }
}
