export namespace SlideHeaderModel {
  export enum SlideType {
    UP = 'Up',
    DOWN = 'Down',
  }

  export enum MethodType {
    SLIDE_DOWN = 'slideDown',
    SLIDE_UP = 'slideUp',
  }

  export enum SlideTiming {
    EASE = 'ease',
    LINEAR = 'linear',
    EASE_IN = 'ease-in',
    EASE_OUT = 'ease-out',
    EASE_IN_OUT = 'ease-in-out',
  }

  export interface Option {
    [key: string]: any;
    headerBarHeight?: number;
    headerBarWidth?: string;
    header2SelectorName?: string;
    zIndex?: number;
    boxShadow?: string;
    opacity?: number;
    slidePoint?: number;
    slideDownDuration?: string;
    slideUpDuration?: string;
    slideDownTiming?: SlideTiming | string;
    slideUpTiming?: SlideTiming | string;
    slideDownCallback?: () => void;
    slideUpCallback?: () => void;
    cloneHeader?: boolean;
    fullscreenView?: boolean;
    headroom?: boolean;
  }
}
