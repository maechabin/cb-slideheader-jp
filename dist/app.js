"use strict";
exports.__esModule = true;
var app_model_1 = require("./app.model");
var SlideHeader = /** @class */ (function () {
    function SlideHeader(element, options) {
        this.methodType = app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN;
        this.slideDirection = app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
        this.config = {};
        if (!element) {
            throw new Error('element must not be null.');
        }
        this.element = document.querySelector(element);
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
            slideDownTiming: app_model_1.SlideHeaderModel.SLIDE_TIMING.EASE,
            slideUpTiming: app_model_1.SlideHeaderModel.SLIDE_TIMING.EASE,
            slideDownCallback: function () { },
            slideUpCallback: function () { },
            cloneHeader: false,
            fullscreenView: false,
            headroom: false
        };
    }
    SlideHeader.prototype.handleScroll = function (top, slideType) {
        var _this = this;
        var slideDuration = this.config["slide" + slideType + "Duration"];
        var slideTiming = this.config["slide" + slideType + "Timing"];
        var frameId = 0;
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(function () {
            _this.element.setAttribute('style', "\n          transition: transform " + slideDuration + " " + slideTiming + ";\n          transform: translate3d(0, " + top + ", 0);\n        ");
        });
        this.slideDirection =
            this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP
                ? app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN
                : app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
    };
    SlideHeader.prototype.handleTransitionend = function (slideType, style) {
        this.config["slide" + slideType + "Callback"];
        //this.element.setAttribute('style', style);
    };
    SlideHeader.prototype.runSlideHeader = function () {
        var _this = this;
        var top1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? 0
            : "-" + this.config.headerBarHeight + "px";
        var top2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? "-" + this.config.headerBarHeight + "px"
            : 0;
        var slideType1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN
            : app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
        var slideType2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? app_model_1.SlideHeaderModel.SLIDE_TYPE.UP
            : app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN;
        var startingScrollTop = 0; // スライドの開始位置
        var currentScrollTop = 0; // 現在のスクロールの位置
        var style1 = "\n      box-shadow: " + this.config.boxShadow + ";\n      transition: 'box-shadow .9s linear',\n    ";
        var style2 = "\n      box-shadow: none;\n    ";
        var css1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style1 : style2;
        var css2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style2 : style1;
        window.addEventListener('scroll', function () {
            if (!_this.config.slidePoint) {
                throw new Error('slidePoint must not to be undefined.');
            }
            currentScrollTop = window.scrollY;
            if (_this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_UP && _this.config.headroom) {
                /** Headroom時 */
                if (currentScrollTop > startingScrollTop && currentScrollTop > _this.config.slidePoint) {
                    if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                        _this.handleScroll(top1, slideType1);
                    }
                }
                else {
                    if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN) {
                        _this.handleScroll(top2, slideType2);
                    }
                }
                startingScrollTop = currentScrollTop;
            }
            else {
                /** 通常時（Headroomじゃない時） */
                if (currentScrollTop > _this.config.slidePoint) {
                    /** スクロール位置がスライドポイントより大きくなった場合 */
                    if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                        _this.handleScroll(top1, slideType1);
                    }
                }
                else {
                    /** スクロール位置がスライドポイントより小さくなった場合 */
                    if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN) {
                        _this.handleScroll(top2, slideType2);
                    }
                }
            }
        }, false);
        window.addEventListener('transitionend', function () {
            if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                _this.handleTransitionend(slideType1, css1);
            }
            else {
                _this.handleTransitionend(slideType2, css2);
            }
        }, false);
    };
    SlideHeader.prototype.applyStyle = function () {
        var top = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN
            ? "-" + this.config.headerBarHeight + "px"
            : 0;
        this.element.setAttribute('style', "\n        transform: translate3d(0, " + top + ", 0);\n        visibility: 'visible';\n        opacity: " + this.config.opacity + ";\n        width: " + this.config.headerBarWidth + ";\n        zIndex: " + this.config.zIndex + ";\n      ");
    };
    SlideHeader.prototype.cloneHeader = function () {
        if (!this.element.parentNode) {
            throw new Error('parentNode does not be found.');
        }
        var clonedElement = this.element.cloneNode(true);
        this.element.parentNode.insertBefore(clonedElement, this.element.nextElementSibling);
        clonedElement.removeAttribute('class');
        clonedElement.setAttribute('class', 'cb-header1');
        clonedElement.setAttribute('style', "\n        'z-index': 10000;\n      ");
    };
    SlideHeader.prototype.changeHeaderHeight = function () {
        if (!this.config.header2SelectorName) {
            throw new Error('header2SelectorName must not be undefined.');
        }
        var header2 = document.querySelector(this.config.header2SelectorName);
        if (header2 instanceof Element === false) {
            throw new Error('querySelector does not find appropriate element.');
        }
        var headerBarHeight = this.element.clientHeight;
        var headerHeight = headerBarHeight + header2.clientHeight;
        var windowHeight = window.outerHeight;
        var padding = 0;
        if (windowHeight > headerHeight) {
            if (this.config.cloneHeader) {
                padding = (windowHeight - headerHeight) / 2;
            }
            else {
                padding = (windowHeight - headerHeight + headerBarHeight) / 2;
            }
            this.config.slidePoint = windowHeight;
            header2.setAttribute('style', "\n          'padding-top': " + padding + "px;\n          'padding-bottom': " + padding + "px;\n        ");
        }
        else {
            if (this.config.cloneHeader) {
                this.config.slidePoint = headerHeight;
            }
            else {
                this.config.slidePoint = headerHeight - headerBarHeight;
            }
        }
    };
    SlideHeader.prototype.init = function (type) {
        if (type &&
            (type === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_UP ||
                type === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN)) {
            this.methodType = type;
        }
        this.config = Object.assign({}, this.defaults, this.options);
        if (this.config.cloneHeader) {
            this.cloneHeader();
        }
        this.applyStyle();
        if (this.config.fullscreenView) {
            this.changeHeaderHeight();
        }
        this.runSlideHeader();
    };
    return SlideHeader;
}());
exports["default"] = SlideHeader;
window.SlideHeader = SlideHeader;
