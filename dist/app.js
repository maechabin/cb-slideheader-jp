"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_model_1 = require("./app.model");
class SlideHeader {
    constructor(element, options) {
        this.methodType = app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN;
        this.slideDirection = app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
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
            slideDownDuration: '500ms',
            slideUpDuration: '500ms',
            slideDownTiming: app_model_1.SlideHeaderModel.SLIDE_TIMING.EASE,
            slideUpTiming: app_model_1.SlideHeaderModel.SLIDE_TIMING.EASE,
            slideDownCallback: () => { },
            slideUpCallback: () => { },
            isCloneHeader: false,
            isFullscreenView: false,
            isHeadroom: false,
        };
    }
    handleScroll(top, slideType) {
        const slideDuration = this.config[`slide${slideType}Duration`];
        const slideTiming = this.config[`slide${slideType}Timing`];
        let frameId;
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
            this.element.setAttribute('style', `
          transition: transform ${slideDuration} ${slideTiming};
          transform: translate3d(0, ${top}, 0);
        `);
        });
        this.slideDirection =
            this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP
                ? app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN
                : app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
    }
    handleTransitionend(slideType, style) {
        this.config[`slide${slideType}Callback`];
    }
    runSlideHeader() {
        const top1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? 0
            : `-${this.config.headerBarHeight}px`;
        const top2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? `-${this.config.headerBarHeight}px`
            : 0;
        const slideType1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN
            : app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
        const slideType2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? app_model_1.SlideHeaderModel.SLIDE_TYPE.UP
            : app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN;
        let startingScrollTop = 0;
        let currentScrollTop = 0;
        const style1 = `
      box-shadow: ${this.config.boxShadow};
      transition: 'box-shadow .9s linear',
    `;
        const style2 = `
      box-shadow: none;
    `;
        const css1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style1 : style2;
        const css2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style2 : style1;
        window.addEventListener('scroll', () => {
            currentScrollTop = window.scrollY;
            if (this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_UP && this.config.isHeadroom) {
                if (currentScrollTop > startingScrollTop && currentScrollTop > this.config.slidePoint) {
                    if (this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                        this.handleScroll(top1, slideType1);
                    }
                }
                else {
                    if (this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN) {
                        this.handleScroll(top2, slideType2);
                    }
                }
                startingScrollTop = currentScrollTop;
            }
            else {
                if (currentScrollTop > this.config.slidePoint) {
                    if (this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                        this.handleScroll(top1, slideType1);
                    }
                }
                else {
                    if (this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN) {
                        this.handleScroll(top2, slideType2);
                    }
                }
            }
        }, false);
        window.addEventListener('transitionend', () => {
            if (this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                this.handleTransitionend(slideType1, css1);
            }
            else {
                this.handleTransitionend(slideType2, css2);
            }
        }, false);
    }
    applyStyle() {
        const top = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? `-${this.config.headerBarHeight}px`
            : 0;
        this.element.setAttribute('style', `
        transform: translate3d(0, ${top}, 0);
        visibility: 'visible';
        opacity: ${this.config.opacity};
        width: ${this.config.headerBarWidth};
        zIndex: ${this.config.zIndex};
      `);
    }
    cloneHeader() {
        const clonedElement = this.element.cloneNode(true);
        this.element.parentNode.insertBefore(clonedElement, this.element.nextElementSibling);
        clonedElement.removeAttribute('class');
        clonedElement.setAttribute('class', 'cb-header1');
        clonedElement.setAttribute('style', `
        'z-index': 10000;
      `);
    }
    changeHeaderHeight() {
        const headerBarHeight = this.element.clientHeight;
        const header2 = document.querySelector(this.config.header2SelectorName);
        const headerHeight = headerBarHeight + header2.clientHeight;
        const windowHeight = window.outerHeight;
        let padding = null;
        if (windowHeight > headerHeight) {
            if (this.config.isCloneHeader) {
                padding = (windowHeight - headerHeight) / 2;
            }
            else {
                padding = (windowHeight - headerHeight + headerBarHeight) / 2;
            }
            this.config.slidePoint = windowHeight;
            header2.setAttribute('style', `
          'padding-top': ${padding}px;
          'padding-bottom': ${padding}px;
        `);
        }
        else {
            if (this.config.isCloneHeader) {
                this.config.slidePoint = headerHeight;
            }
            else {
                this.config.slidePoint = headerHeight - headerBarHeight;
            }
        }
    }
    init(type) {
        if (type &&
            (type === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_UP ||
                type === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN)) {
            this.methodType = type;
        }
        this.config = Object.assign({}, this.defaults, this.options);
        if (this.config.isCloneHeader) {
            this.cloneHeader();
        }
        this.applyStyle();
        if (this.config.isFullscreenView) {
            this.changeHeaderHeight();
        }
        this.runSlideHeader();
    }
}
exports.SlideHeader = SlideHeader;
window.SlideHeader = SlideHeader;
