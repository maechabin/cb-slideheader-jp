export namespace SlideHeaderModel {
  export enum SLIDE_TYPE {
    UP = 'Up',
    DOWN = 'Down',
  }

  export enum METHOD_TYPE {
    SLIDE_DOWN = 'slideDown',
    SLIDE_UP = 'slideUp',
  }

  export enum SLIDE_TIMING {
    EASE = 'ease',
    LINEAR = 'linear',
    EASE_IN = 'ease-in',
    EASE_OUT = 'ease-out',
    EASE_IN_OUT = 'ease-in-out',
  }

  export interface Option {
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
