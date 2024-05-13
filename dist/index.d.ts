import type { createPopper } from "@popperjs/core/lib/createPopper";
import type { DefineComponent } from 'vue';
declare const VOnboardingWrapper: DefineComponent<{
    steps: StepEntity[];
    options?: VOnboardingWrapperOptions;
}>;
declare const VOnboardingStep: DefineComponent;
declare const useVOnboarding: (wrapperRef: any) => {
    start(): void;
    finish(): void;
    goToStep: (newStepNumber: number | ((currentStepNumber: number) => number)) => void;
};
interface SvgOverlayOptions {
    enabled?: boolean;
    padding?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    borderRadius?: number | {
        leftTop?: number;
        rightTop?: number;
        rightBottom?: number;
        leftBottom?: number;
    };
    preventOverlayInteraction?: boolean;
}
interface VOnboardingWrapperOptions {
    popper?: Parameters<typeof createPopper>[2];
    overlay?: SvgOverlayOptions;
    scrollToStep?: {
        enabled?: boolean;
        options?: ScrollIntoViewOptions;
    };
    autoFinishByExit?: boolean;
    hideButtons?: {
        previous?: boolean;
        next?: boolean;
        exit?: boolean;
    };
    labels?: {
        previousButton?: string;
        nextButton?: string;
        finishButton?: string;
    };
    hideNextStepDuringHook?: boolean;
}
declare type AttachableElement = string | (() => Element | null);
interface onGlobalOptions {
    index: number;
    step: StepEntity;
    direction: 1 | -1 | number;
    isForward: boolean;
    isBackward: boolean;
}
declare type onBeforeStepOptions = onGlobalOptions & {};
declare type onAfterStepOptions = onGlobalOptions & {};
interface StepEntity {
    content: {
        title: string;
        description?: string;
        html?: boolean;
    };
    on?: {
        beforeStep?: (options?: onBeforeStepOptions) => void | Promise<void>;
        afterStep?: (options?: onAfterStepOptions) => void | Promise<void>;
    };
    attachTo: {
        element: AttachableElement;
        classList?: string[];
    };
    options?: VOnboardingWrapperOptions;
}
export { VOnboardingWrapperOptions, VOnboardingWrapper, VOnboardingStep, useVOnboarding, AttachableElement, StepEntity, onBeforeStepOptions, onAfterStepOptions, SvgOverlayOptions };
