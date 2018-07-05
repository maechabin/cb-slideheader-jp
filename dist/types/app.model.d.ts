export declare namespace SlideHeaderModel {
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
        cloneHeader?: boolean;
        fullscreenView?: boolean;
        headroom?: boolean;
    }
}
