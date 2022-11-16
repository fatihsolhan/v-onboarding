export default function useVOnboarding(wrapperRef: any): {
    start: () => any;
    finish: () => any;
    goToStep: (newStepNumber: number | ((currentStepNumber: number) => number)) => any;
};
