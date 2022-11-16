import type { StepEntity } from '../types/StepEntity';
import { VOnboardingWrapperOptions } from '../types/VOnboardingWrapper';
import type { DefineComponent, Ref, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes, PropType } from 'vue';
declare const _sfc_main: DefineComponent<{
    steps: {
        type: PropType<StepEntity[]>;
        default: () => never[];
    };
    options: {
        type: PropType<VOnboardingWrapperOptions>;
        default: () => {};
    };
}, {
    index: Ref<number>;
    activeStep: ComputedRef<any>;
    toPreviousStep: () => void;
    toNextStep: () => void;
    isFinished: ComputedRef<boolean>;
    setIndex: (value: number | ((_: number) => number)) => void;
    isFirstStep: ComputedRef<boolean>;
    isLastStep: ComputedRef<boolean>;
    finish: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "exit"[], "exit", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    steps: {
        type: PropType<StepEntity[]>;
        default: () => never[];
    };
    options: {
        type: PropType<VOnboardingWrapperOptions>;
        default: () => {};
    };
}>> & {
    onExit?: ((...args: any[]) => any) | undefined;
}, {
    options: VOnboardingWrapperOptions;
    steps: StepEntity[];
}>;
export default _sfc_main;
