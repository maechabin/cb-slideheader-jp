import { SlideHeaderModel } from './app.model';

export default class SlideHeader {
  element: Element;
  methodType: SlideHeaderModel.METHOD_TYPE = SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN;
  slideDirection: SlideHeaderModel.SLIDE_TYPE = SlideHeaderModel.SLIDE_TYPE.UP;
  config: SlideHeaderModel.Option = {} as SlideHeaderModel.Option;
  options: SlideHeaderModel.Option;
  defaults: SlideHeaderModel.Option;

  constructor(element: string, options: SlideHeaderModel.Option) {
    if (!element) {
      throw new Error('element must not be null.');
    }

    this.element = document.querySelector(element) as Element;

    if (this.element instanceof Element === false) {
      throw new Error('querySelector does not find appropriate element.');
    }

    this.options = options;
    this.defaults = {
      headerBarHeight: this.element.clientHeight,
      headerBarWidth: '100%',
      header2SelectorName: '.cb-header2',
      zIndex: 9999,
      boxShadow: 'none',
      opacity: 1,
      slidePoint: 0,
      slideDownDuration: '500ms',
      slideUpDuration: '500ms',
      slideDownTiming: SlideHeaderModel.SLIDE_TIMING.EASE,
      slideUpTiming: SlideHeaderModel.SLIDE_TIMING.EASE,
      slideDownCallback: () => {},
      slideUpCallback: () => {},
      cloneHeader: false,
      fullscreenView: false,
      headroom: false,
    };
  }

  handleScroll(top: number | string, slideType: SlideHeaderModel.SLIDE_TYPE): void {
    const slideDuration = this.config[`slide${slideType}Duration`];
    const slideTiming = this.config[`slide${slideType}Timing`];

    let frameId: number = 0;
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      this.element.setAttribute(
        'style',
        `
          transition: transform ${slideDuration} ${slideTiming};
          transform: translate3d(0, ${top}, 0);
        `,
      );
    });

    this.slideDirection =
      this.slideDirection === SlideHeaderModel.SLIDE_TYPE.UP
        ? SlideHeaderModel.SLIDE_TYPE.DOWN
        : SlideHeaderModel.SLIDE_TYPE.UP;
  }

  handleTransitionend(slideType: SlideHeaderModel.SLIDE_TYPE, style: string): void {
    this.config[`slide${slideType}Callback`];
    //this.element.setAttribute('style', style);
  }

  runSlideHeader(): void {
    const top1 =
      this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
        ? 0
        : `-${this.config.headerBarHeight}px`;
    const top2 =
      this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
        ? `-${this.config.headerBarHeight}px`
        : 0;
    const slideType1 =
      this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
        ? SlideHeaderModel.SLIDE_TYPE.DOWN
        : SlideHeaderModel.SLIDE_TYPE.UP;
    const slideType2 =
      this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
        ? SlideHeaderModel.SLIDE_TYPE.UP
        : SlideHeaderModel.SLIDE_TYPE.DOWN;
    let startingScrollTop: number = 0; // スライドの開始位置
    let currentScrollTop: number = 0; // 現在のスクロールの位置

    const style1 = `
      box-shadow: ${this.config.boxShadow};
      transition: 'box-shadow .9s linear',
    `;
    const style2 = `
      box-shadow: none;
    `;
    const css1 = this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style1 : style2;
    const css2 = this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style2 : style1;

    window.addEventListener(
      'scroll',
      () => {
        if (!this.config.slidePoint) {
          throw new Error('slidePoint must not to be undefined.');
        }

        currentScrollTop = window.scrollY;

        if (this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_UP && this.config.headroom) {
          /** Headroom時 */
          if (currentScrollTop > startingScrollTop && currentScrollTop > this.config.slidePoint) {
            if (this.slideDirection === SlideHeaderModel.SLIDE_TYPE.UP) {
              this.handleScroll(top1, slideType1);
            }
          } else {
            if (this.slideDirection === SlideHeaderModel.SLIDE_TYPE.DOWN) {
              this.handleScroll(top2, slideType2);
            }
          }
          startingScrollTop = currentScrollTop;
        } else {
          /** 通常時（Headroomじゃない時） */
          if (currentScrollTop > this.config.slidePoint) {
            /** スクロール位置がスライドポイントより大きくなった場合 */
            if (this.slideDirection === SlideHeaderModel.SLIDE_TYPE.UP) {
              this.handleScroll(top1, slideType1);
            }
          } else {
            /** スクロール位置がスライドポイントより小さくなった場合 */
            if (this.slideDirection === SlideHeaderModel.SLIDE_TYPE.DOWN) {
              this.handleScroll(top2, slideType2);
            }
          }
        }
      },
      false,
    );

    window.addEventListener(
      'transitionend',
      () => {
        if (this.slideDirection === SlideHeaderModel.SLIDE_TYPE.UP) {
          this.handleTransitionend(slideType1, css1);
        } else {
          this.handleTransitionend(slideType2, css2);
        }
      },
      false,
    );
  }

  applyStyle(): void {
    const top =
      this.methodType === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
        ? `-${this.config.headerBarHeight}px`
        : 0;
    this.element.setAttribute(
      'style',
      `
        transform: translate3d(0, ${top}, 0);
        visibility: 'visible';
        opacity: ${this.config.opacity};
        width: ${this.config.headerBarWidth};
        zIndex: ${this.config.zIndex};
      `,
    );
  }

  cloneHeader(): void {
    if (!this.element.parentNode) {
      throw new Error('parentNode does not be found.');
    }

    const clonedElement = this.element.cloneNode(true) as HTMLElement;
    this.element.parentNode.insertBefore(clonedElement, this.element.nextElementSibling);
    clonedElement.removeAttribute('class');
    clonedElement.setAttribute('class', 'cb-header1');
    clonedElement.setAttribute(
      'style',
      `
        'z-index': 10000;
      `,
    );
  }

  changeHeaderHeight(): void {
    if (!this.config.header2SelectorName) {
      throw new Error('header2SelectorName must not be undefined.');
    }

    const header2: Element = document.querySelector(this.config.header2SelectorName) as Element;

    if (header2 instanceof Element === false) {
      throw new Error('querySelector does not find appropriate element.');
    }

    const headerBarHeight: number = this.element.clientHeight;
    const headerHeight: number = headerBarHeight + header2.clientHeight;
    const windowHeight: number = window.outerHeight;
    let padding: number = 0;

    if (windowHeight > headerHeight) {
      if (this.config.cloneHeader) {
        padding = (windowHeight - headerHeight) / 2;
      } else {
        padding = (windowHeight - headerHeight + headerBarHeight) / 2;
      }
      this.config.slidePoint = windowHeight;
      header2.setAttribute(
        'style',
        `
          'padding-top': ${padding}px;
          'padding-bottom': ${padding}px;
        `,
      );
    } else {
      if (this.config.cloneHeader) {
        this.config.slidePoint = headerHeight;
      } else {
        this.config.slidePoint = headerHeight - headerBarHeight;
      }
    }
  }

  init(type?: SlideHeaderModel.METHOD_TYPE): void {
    if (
      type &&
      (type === SlideHeaderModel.METHOD_TYPE.SLIDE_UP ||
        type === SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN)
    ) {
      this.methodType = type;
    }
    this.config = (<SlideHeaderModel.Option>Object).assign({}, this.defaults, this.options);
    if (this.config.cloneHeader) {
      this.cloneHeader();
    }
    this.applyStyle();
    if (this.config.fullscreenView) {
      this.changeHeaderHeight();
    }
    this.runSlideHeader();
  }
}

declare global {
  interface Window {
    SlideHeader: any;
  }
}

window.SlideHeader = SlideHeader;
