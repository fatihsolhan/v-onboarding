import type { Ref } from 'vue';
import { SvgOverlayOptions } from '../types/VOnboardingWrapper';
export default function useSvgOverlay(): {
    path: Ref<string>;
    updatePath: (element: Element | null, options?: Omit<SvgOverlayOptions, 'enabled'>) => Promise<void>;
};
