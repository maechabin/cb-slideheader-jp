declare namespace SlideHeaderModel {
    enum SLIDE_TYPE {
        UP = "Up",
        DOWN = "Down"
    }
    enum METHOD_TYPE {
        SLIDE_DOWN = "slideDown",
        SLIDE_UP = "slideUp"
    }
    enum SLIDE_TIMING {
        EASE = "ease",
        LINEAR = "linear",
        EASE_IN = "ease-in",
        EASE_OUT = "ease-out",
        EASE_IN_OUT = "ease-in-out"
    }
    interface Option {
        headerBarHeight?: number;
        headerBarWidth?: string;
        header2SelectorName?: string;
        zIndex?: number;
        boxShadow?: string;
        opacity?: number;
        slidePoint?: number;
        slideDownDuration: string;
        slideUpDuration: string;
        slideDownTiming?: SLIDE_TIMING | string;
        slideUpTiming?: SLIDE_TIMING | string;
        slideDownCallback?: () => void;
        slideUpCallback?: () => void;
        isCloneHeader?: boolean;
        isFullscreenView?: boolean;
        isHeadroom?: boolean;
    }
}
declare module "app" {
    export class SlideHeader {
        element: Element;
        methodType: SlideHeaderModel.METHOD_TYPE;
        slideDirection: SlideHeaderModel.SLIDE_TYPE;
        config: SlideHeaderModel.Option;
        options: SlideHeaderModel.Option;
        defaults: SlideHeaderModel.Option;
        constructor(element: string, options: SlideHeaderModel.Option);
        handleScroll(top: number | string, slideType: SlideHeaderModel.SLIDE_TYPE): void;
        handleTransitionend(slideType: SlideHeaderModel.SLIDE_TYPE, style: string): void;
        runSlideHeader(): void;
        applyStyle(): void;
        cloneHeader(): void;
        changeHeaderHeight(): void;
        init(type?: SlideHeaderModel.METHOD_TYPE): void;
    }
    global {
        interface Window {
            SlideHeader: any;
        }
    }
}
