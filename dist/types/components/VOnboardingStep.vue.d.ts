import { StepEntity } from '../types/StepEntity';
import type { DefineComponent, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes, ComputedRef } from 'vue';
declare const _sfc_main: DefineComponent<{}, {
    stepElement: Ref<HTMLElement | null>;
    onNext: () => void;
    onPrevious: () => void;
    path: Ref<string>;
    show: Ref<boolean>;
    step: ComputedRef<StepEntity>;
    isFirst: ComputedRef<boolean> | undefined;
    isLast: ComputedRef<boolean> | undefined;
    exit: () => void;
    isButtonVisible: ComputedRef<{
        previous: boolean;
        next: boolean;
    }>;
    buttonLabels: ComputedRef<{
        previous: string | undefined;
        next: string | undefined;
        finish: string | undefined;
    }>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}>;
export default _sfc_main;
