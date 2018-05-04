import { Option, SLIDE_TYPE, METHOD_TYPE } from './app.model';

export default class SlideHeader {
  element: Element;
  methodType: METHOD_TYPE = METHOD_TYPE.SLIDE_DOWN;
  slideDirection: SLIDE_TYPE = SLIDE_TYPE.UP;
  config: Option;
  options: Option;
  defaults: Option;

  constructor(element: string, options: Option) {
    this.element = document.querySelector(element);
    this.options = options;
    this.defaults = {
      headerBarHeight: this.element.clientHeight,
      headerBarWidth: '100%',
      header2SelectorName: '.cb-header2',
      zIndex: 9999,
      boxShadow: 'none',
      opacity: 1,
      slidePoint: 0,
      slideDownSpeed: '500ms',
      slideUpSpeed: '500ms',
      slideDownEasing: 'ease',
      slideUpEasing: 'ease',
      slideDownCallback: () => {},
      slideUpCallback: () => {},
      shouldCloneHeader: false,
      isFullscreenView: false,
      isHeadroom: false,
    };
  }

  handleScroll(top: number | string, slideType: SLIDE_TYPE): void {
    const slideSpeed = this.config[`slide${slideType}Speed`];
    const slideEasing = this.config[`slide${slideType}Easing`];

    let frameId;
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      this.element.setAttribute('style', `
        transition: transform ${slideSpeed} ${slideEasing};
        transform: translate3d(0, ${top}, 0);
      `);
    });

    this.slideDirection = (this.slideDirection === SLIDE_TYPE.UP) ? SLIDE_TYPE.DOWN : SLIDE_TYPE.UP;
  }

  handleTransitionend(slideType: SLIDE_TYPE, style: string): void {
    this.config[`slide${slideType}Callback`];
    //this.element.setAttribute('style', style);
  }

  runSlideHeader(): void {
    const top1 = (this.methodType === METHOD_TYPE.SLIDE_DOWN) ? 0 : `-${this.config.headerBarHeight}px`;
    const top2 = (this.methodType === METHOD_TYPE.SLIDE_DOWN) ? `-${this.config.headerBarHeight}px` : 0;
    const slideType1 = (this.methodType === METHOD_TYPE.SLIDE_DOWN) ? SLIDE_TYPE.DOWN : SLIDE_TYPE.UP;
    const slideType2 = (this.methodType === METHOD_TYPE.SLIDE_DOWN) ? SLIDE_TYPE.UP : SLIDE_TYPE.DOWN;
    let startingScrollTop: number = 0; // スライドの開始位置
    let currentScrollTop: number = 0; // 現在のスクロールの位置

    const style1 = `
      box-shadow: ${this.config.boxShadow};
      transition: 'box-shadow .9s linear',
    `;
    const style2 = `
      box-shadow: none;
    `;
    const css1 = (this.methodType === METHOD_TYPE.SLIDE_DOWN) ? style1 : style2;
    const css2 = (this.methodType === METHOD_TYPE.SLIDE_DOWN) ? style2 : style1;

    window.addEventListener('scroll', () => {
      currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (this.methodType === METHOD_TYPE.SLIDE_UP && this.config.isHeadroom) {
        /** Headroom時 */
        if (currentScrollTop > startingScrollTop　&& currentScrollTop > this.config.slidePoint) {
          if (this.slideDirection === SLIDE_TYPE.UP) {
            this.handleScroll(top1, slideType1);
          }
        } else {
          if (this.slideDirection === SLIDE_TYPE.DOWN) {
            this.handleScroll(top2, slideType2);
          }
        }
        startingScrollTop = currentScrollTop;
      } else {
        /** 通常時（Headroomじゃない時） */
        if (currentScrollTop > this.config.slidePoint) {
          /** スクロール位置がスライドポイントより大きくなった場合 */
          if (this.slideDirection === SLIDE_TYPE.UP) {
            this.handleScroll(top1, slideType1);
          }
        } else {
          /** スクロール位置がスライドポイントより小さくなった場合 */
          if (this.slideDirection === SLIDE_TYPE.DOWN) {
            this.handleScroll(top2, slideType2);
          }
        }
      }
    }, false);

    window.addEventListener('transitionend', () => {
      if (this.slideDirection === SLIDE_TYPE.UP) {
        this.handleTransitionend(slideType1, css1);
      } else {
        this.handleTransitionend(slideType2, css2);
      }
    }, false);
  }

  applyStyle(): void {
    const top = (this.methodType === METHOD_TYPE.SLIDE_DOWN) ? `-${this.config.headerBarHeight}px` : 0;
    this.element.setAttribute('style', `
      transform: translate3d(0, ${top}, 0);
      visibility: 'visible';
      opacity: ${this.config.opacity};
      width: ${this.config.headerBarWidth};
      zIndex: ${this.config.zIndex};
    `);
  }

  cloneHeader(): void {
    const clonedElement = this.element.cloneNode(true) as HTMLElement;
    this.element.parentNode.insertBefore(clonedElement, this.element.nextElementSibling);
    clonedElement.removeAttribute('class');
    clonedElement.setAttribute('class', 'cb-header1');
    clonedElement.setAttribute('style', `
      'z-index': 10000;
    `);
  }

  changeHeaderHeight(): void {
    const headerBarHeight: number = this.element.clientHeight;
    const header2: Element = document.querySelector(this.config.header2SelectorName);
    const headerHeight: number = headerBarHeight + header2.clientHeight;
    const windowHeight: number = window.outerHeight;
    let padding: number = null;

    if (windowHeight > headerHeight) {
      if (this.config.shouldCloneHeader) {
        padding = (windowHeight - headerHeight) / 2;
      } else {
        padding = (windowHeight - headerHeight + headerBarHeight) / 2;
      }
      this.config.slidePoint = windowHeight;
      header2.setAttribute('style', `
        'padding-top': ${padding}px;
        'padding-bottom': ${padding}px;
      `);
    } else {
      if (this.config.shouldCloneHeader) {
        this.config.slidePoint = headerHeight;
      } else {
        this.config.slidePoint = headerHeight - headerBarHeight;
      }
    }
  }

  init(type?: METHOD_TYPE): void {
    if (type) {
      this.methodType = type;
    }
    this.config = Object.assign({}, this.defaults, this.options);
    if (this.config.shouldCloneHeader) {
      this.cloneHeader();
    }
    this.applyStyle();
    if (this.config.isFullscreenView) {
      this.changeHeaderHeight();
    }
    this.runSlideHeader();
  }
}

window.SlideHeader = SlideHeader;