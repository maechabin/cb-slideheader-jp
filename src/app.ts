import { SlideHeaderModel as SH } from './app.model';

export default class SlideHeader {
  element: HTMLElement;
  methodType: SH.MethodType = SH.MethodType.SLIDE_DOWN;
  slideDirection: SH.SlideType = SH.SlideType.UP;
  config: SH.Option = {} as SH.Option;
  options: SH.Option;
  defaults: SH.Option;

  constructor(element: string, options: SH.Option) {
    if (!element) {
      throw new Error('element must not be null.');
    }

    this.element = document.querySelector(element) as HTMLElement;

    if (this.element instanceof HTMLElement === false) {
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
      slideDownTiming: SH.SlideTiming.EASE,
      slideUpTiming: SH.SlideTiming.EASE,
      slideDownCallback: () => {},
      slideUpCallback: () => {},
      cloneHeader: false,
      fullscreenView: false,
      headroom: false,
    };
  }

  /**
   * ブラウザをスクロールした時に呼び出される処理
   * @param top
   * @param slideType
   */
  handleScroll(slideType: SH.SlideType, top: number | string): void {
    const slideDuration = this.config[`slide${slideType}Duration`];
    const slideTiming = this.config[`slide${slideType}Timing`];

    let frameId: number = 0;
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      this.element.style.transition = `transform ${slideDuration} ${slideTiming}`;
      this.element.style.transform = `translate3d(0, ${top}, 0)`;
    });

    this.slideDirection = this.slideDirection === SH.SlideType.UP ? SH.SlideType.DOWN : SH.SlideType.UP;
  }

  /**
   * ヘッダーバーのアニメーションが終わった時に呼び出される処理
   * @param slideType
   * @param style
   */
  handleTransitionend(slideType: SH.SlideType, style: string): void {
    this.config[`slide${slideType}Callback`];
    this.element.style.boxShadow = style;
  }

  /**
   * SlideHeaderのメイン処理
   */
  excuteSlideHeader(): void {
    const top1 = this.methodType === SH.MethodType.SLIDE_DOWN ? 0 : `-${this.config.headerBarHeight}px`;
    const top2 = this.methodType === SH.MethodType.SLIDE_DOWN ? `-${this.config.headerBarHeight}px` : 0;
    const slideType1 = this.methodType === SH.MethodType.SLIDE_DOWN ? SH.SlideType.DOWN : SH.SlideType.UP;
    const slideType2 = this.methodType === SH.MethodType.SLIDE_DOWN ? SH.SlideType.UP : SH.SlideType.DOWN;
    let startingScrollTop: number = 0; // スライドの開始位置
    let currentScrollTop: number = 0; // 現在のスクロールの位置

    const style1 = `${this.config.boxShadow}`;
    const style2 = 'none';
    const css1 = this.methodType === SH.MethodType.SLIDE_DOWN ? boxShadowStyle1 : boxShadowStyle2;
    const css2 = this.methodType === SH.MethodType.SLIDE_DOWN ? boxShadowStyle2 : boxShadowStyle1;

    window.addEventListener(
      'scroll',
      () => {
        if (!this.config.slidePoint) {
          throw new Error('slidePoint must not to be undefined.');
        }

        currentScrollTop = window.scrollY;

        if (this.methodType === SH.MethodType.SLIDE_UP && this.config.headroom) {
          /** Headroom時 */
          if (currentScrollTop > startingScrollTop && currentScrollTop > this.config.slidePoint) {
            if (this.slideDirection === SH.SlideType.UP) {
              this.handleScroll(slideType1, top1);
            }
          } else {
            if (this.slideDirection === SH.SlideType.DOWN) {
              this.handleScroll(slideType2, top2);
            }
          }
          startingScrollTop = currentScrollTop;
        } else {
          /** 通常時（Headroomじゃない時） */
          if (currentScrollTop > this.config.slidePoint) {
            /** スクロール位置がスライドポイントより大きくなった場合 */
            if (this.slideDirection === SH.SlideType.UP) {
              this.handleScroll(top1, slideType1);
            }
          } else {
            /** スクロール位置がスライドポイントより小さくなった場合 */
            if (this.slideDirection === SH.SlideType.DOWN) {
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
        const slideType = this.slideDirection === SH.SlideType.UP ? slideType1 : slideType2;
        const css = this.slideDirection === SH.SlideType.UP ? css1 : css2;
        this.handleTransitionend(slideType, css);
      },
      false,
    );
  }

  /**
   * ヘッダーバーの初期スタイルを適用する
   */
  applyDefaultHeaderStyles(): void {
    const top = this.methodType === SH.MethodType.SLIDE_DOWN ? `-${this.config.headerBarHeight}px` : 0;
    this.element.style.transform = `translate3d(0, ${top}, 0)`;
    this.element.style.visibility = 'visible';
    this.element.style.opacity = `${this.config.opacity}`;
    this.element.style.width = `${this.config.headerBarWidth}`;
    this.element.style.zIndex = `${this.config.zIndex}`;
  }

  /**
   * ヘッダーバーを複製する
   * cloneHeaderがtrueの時のみ呼び出される
   */
  cloneHeader(): void {
    if (!this.element.parentNode) {
      throw new Error('parentNode does not be found.');
    }

    const clonedElement = this.element.cloneNode(true) as HTMLElement;
    this.element.parentNode.insertBefore(clonedElement, this.element.nextElementSibling);
    clonedElement.removeAttribute('class');
    clonedElement.setAttribute('class', 'cb-header1');
    clonedElement.style.zIndex = '10000';
  }

  /**
   * フルスクリーン要素（header2）の高さを適用する
   * fullscreenViewがtrueの時のみ呼び出される
   */
  applyHeader2Styles(): void {
    if (!this.config.header2SelectorName) {
      throw new Error('header2SelectorName must not be undefined.');
    }

    const header2: HTMLElement = document.querySelector(this.config.header2SelectorName) as HTMLElement;

    if (header2 instanceof HTMLElement === false) {
      throw new Error('querySelector does not find appropriate element.');
    }

    const headerBarHeight: number = this.element.clientHeight;
    const headerHeight: number = headerBarHeight + header2.clientHeight;
    const windowHeight: number = window.outerHeight;

    if (windowHeight > headerHeight) {
      const padding = this.config.cloneHeader
        ? (windowHeight - headerHeight) / 2
        : (windowHeight - headerHeight + headerBarHeight) / 2;
      header2.style.paddingTop = `${padding}px`;
      header2.style.paddingBottom = `${padding}px`;
      this.config.slidePoint = windowHeight;
    } else {
      this.config.slidePoint = this.config.cloneHeader ? headerHeight : headerHeight - headerBarHeight;
    }
  }

  /**
   * インスタンスを初期化する
   * @param type
   */
  init(type: SH.MethodType): void {
    if (!(type && (type === SH.MethodType.SLIDE_UP || type === SH.MethodType.SLIDE_DOWN))) {
      throw new Error('type does not found and is not type of MethodType.');
    }

    this.methodType = type;
    this.config = (<SH.Option>Object).assign({}, this.defaults, this.options);
    if (this.config.cloneHeader) {
      this.cloneHeader();
    }
    this.applyDefaultHeaderStyles();
    if (this.config.fullscreenView) {
      this.applyHeader2Styles();
    }
    this.excuteSlideHeader();
  }
}

declare global {
  interface Window {
    SlideHeader: any;
  }
}

window.SlideHeader = SlideHeader;
