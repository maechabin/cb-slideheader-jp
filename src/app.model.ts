export enum SLIDE_TYPE {
  UP = 'Up',
  DOWN = 'Down',
}

export enum METHOD_TYPE {
  SLIDE_DOWN = 'slideDown',
  SLIDE_UP = 'slideUp',
}

export interface Option {
  headerBarHeight?: number;
  headerBarWidth?: string;
  header2SelectorName?: string;
  zIndex?: number;
  boxShadow?: string;
  opacity?: number;
  slidePoint?: number;
  slideDownSpeed: string;
  slideUpSpeed: string;
  slideDownEasing?: string;
  slideUpEasing?: string;
  slideDownCallback?: () => any;
  slideUpCallback?: () => any;
  shouldCloneHeader?: boolean;
  isFullscreenView?: boolean;
  isHeadroom?: boolean;
}