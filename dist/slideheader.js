"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slideheader_model_1 = require("./slideheader.model");
var SlideHeader = /** @class */ (function () {
    /**
     * インスタンスを生成する
     * @param element
     * @param options
     */
    function SlideHeader(element, options) {
        /** メソッドタイプ */
        this.methodType = slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN;
        /** ヘッダバーのスライドの方向 */
        this.slideDirection = slideheader_model_1.SlideHeaderModel.SlideType.UP;
        /** オプション設定 */
        this.config = {};
        if (!element) {
            throw new Error('element must not be null.');
        }
        this.element = document.querySelector(element);
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
            slideDownTiming: slideheader_model_1.SlideHeaderModel.SlideTiming.EASE,
            slideUpTiming: slideheader_model_1.SlideHeaderModel.SlideTiming.EASE,
            slideDownCallback: function () { },
            slideUpCallback: function () { },
            cloneHeader: false,
            fullscreenView: false,
            headroom: false,
        };
    }
    Object.defineProperty(SlideHeader.prototype, "isHeadroom", {
        /** headroomオプジョンが有効かどうか */
        get: function () {
            if (this.config.headroom === undefined) {
                return false;
            }
            return this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_UP && this.config.headroom;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * ブラウザをスクロールした時に呼び出される処理
     * @param top
     * @param slideType
     */
    SlideHeader.prototype.handleScroll = function (slideType, top) {
        var _this = this;
        var slideDuration = this.config["slide" + slideType + "Duration"];
        var slideTiming = this.config["slide" + slideType + "Timing"];
        var frameId = 0;
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(function () {
            _this.element.style.transition = "transform " + slideDuration + " " + slideTiming;
            _this.element.style.transform = "translate3d(0, " + top + ", 0)";
        });
        this.slideDirection = this.slideDirection === slideheader_model_1.SlideHeaderModel.SlideType.UP ? slideheader_model_1.SlideHeaderModel.SlideType.DOWN : slideheader_model_1.SlideHeaderModel.SlideType.UP;
    };
    /**
     * scrollイベントを監視する
     * @param slideType1
     * @param slideType2
     */
    SlideHeader.prototype.listenScorll = function (slideType1, slideType2) {
        var _this = this;
        var top1 = this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN ? 0 : "-" + this.config.headerBarHeight + "px";
        var top2 = this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN ? "-" + this.config.headerBarHeight + "px" : 0;
        var startingScrollTop = 0; // スライドの開始位置
        var currentScrollTop = 0; // 現在のスクロールの位置
        window.addEventListener('scroll', function () {
            if (!_this.config.slidePoint) {
                throw new Error('slidePoint must not to be undefined.');
            }
            currentScrollTop = window.scrollY;
            if (currentScrollTop > _this.config.slidePoint && currentScrollTop > startingScrollTop) {
                if (_this.slideDirection === slideheader_model_1.SlideHeaderModel.SlideType.UP) {
                    _this.handleScroll(slideType1, top1);
                }
            }
            else {
                if (_this.slideDirection === slideheader_model_1.SlideHeaderModel.SlideType.DOWN) {
                    _this.handleScroll(slideType2, top2);
                }
            }
            if (_this.isHeadroom) {
                startingScrollTop = currentScrollTop;
            }
        }, false);
    };
    /**
     * ヘッダーバーのアニメーションが終わった時に呼び出される処理
     * @param slideType
     * @param style
     */
    SlideHeader.prototype.handleTransitionend = function (slideType, style) {
        this.config["slide" + slideType + "Callback"];
        this.element.style.boxShadow = style;
    };
    /**
     * TransitionEndイベントを監視する
     * @param slideType1
     * @param slideType2
     */
    SlideHeader.prototype.listenTransitionEnd = function (slideType1, slideType2) {
        var _this = this;
        var boxShadowStyle1 = "" + this.config.boxShadow;
        var boxShadowStyle2 = 'none';
        var boxShadow1 = this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN ? boxShadowStyle1 : boxShadowStyle2;
        var boxShadow2 = this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN ? boxShadowStyle2 : boxShadowStyle1;
        window.addEventListener('transitionend', function () {
            var slideType = _this.slideDirection === slideheader_model_1.SlideHeaderModel.SlideType.UP ? slideType1 : slideType2;
            var boxShadow = _this.slideDirection === slideheader_model_1.SlideHeaderModel.SlideType.UP ? boxShadow1 : boxShadow2;
            _this.handleTransitionend(slideType, boxShadow);
        }, false);
    };
    /**
     * SlideHeaderのメイン処理
     */
    SlideHeader.prototype.excuteSlideHeader = function () {
        var slideType1 = this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN ? slideheader_model_1.SlideHeaderModel.SlideType.DOWN : slideheader_model_1.SlideHeaderModel.SlideType.UP;
        var slideType2 = this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN ? slideheader_model_1.SlideHeaderModel.SlideType.UP : slideheader_model_1.SlideHeaderModel.SlideType.DOWN;
        this.listenScorll(slideType1, slideType2);
        this.listenTransitionEnd(slideType1, slideType2);
    };
    /**
     * ヘッダーバーの初期スタイルを適用する
     */
    SlideHeader.prototype.applyDefaultHeaderStyles = function () {
        var top = this.methodType === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN ? "-" + this.config.headerBarHeight + "px" : 0;
        this.element.style.transform = "translate3d(0, " + top + ", 0)";
        this.element.style.visibility = 'visible';
        this.element.style.opacity = "" + this.config.opacity;
        this.element.style.width = "" + this.config.headerBarWidth;
        this.element.style.zIndex = "" + this.config.zIndex;
    };
    /**
     * ヘッダーバーを複製する
     * cloneHeaderがtrueの時のみ呼び出される
     */
    SlideHeader.prototype.cloneHeader = function () {
        if (!this.element.parentNode) {
            throw new Error('parentNode does not be found.');
        }
        var clonedElement = this.element.cloneNode(true);
        this.element.parentNode.insertBefore(clonedElement, this.element.nextElementSibling);
        clonedElement.removeAttribute('class');
        clonedElement.setAttribute('class', 'cb-header1');
        clonedElement.style.zIndex = '10000';
    };
    /**
     * フルスクリーン要素（header2）の高さを適用する
     * fullscreenViewがtrueの時のみ呼び出される
     */
    SlideHeader.prototype.applyHeader2Styles = function () {
        if (!this.config.header2SelectorName) {
            throw new Error('header2SelectorName must not be undefined.');
        }
        var header2 = document.querySelector(this.config.header2SelectorName);
        if (header2 instanceof HTMLElement === false) {
            throw new Error('querySelector does not find appropriate element.');
        }
        var headerBarHeight = this.element.clientHeight;
        var headerHeight = headerBarHeight + header2.clientHeight;
        var windowHeight = window.outerHeight;
        if (windowHeight > headerHeight) {
            var padding = this.config.cloneHeader
                ? (windowHeight - headerHeight) / 2
                : (windowHeight - headerHeight + headerBarHeight) / 2;
            header2.style.paddingTop = padding + "px";
            header2.style.paddingBottom = padding + "px";
            this.config.slidePoint = windowHeight;
        }
        else {
            this.config.slidePoint = this.config.cloneHeader ? headerHeight : headerHeight - headerBarHeight;
        }
    };
    /**
     * インスタンスを初期化する
     * @param type
     */
    SlideHeader.prototype.init = function (type) {
        if (!(type && (type === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_UP || type === slideheader_model_1.SlideHeaderModel.MethodType.SLIDE_DOWN))) {
            throw new Error('type does not found and is not type of MethodType.');
        }
        this.methodType = type;
        this.config = Object.assign({}, this.defaults, this.options);
        if (this.config.cloneHeader) {
            this.cloneHeader();
        }
        this.applyDefaultHeaderStyles();
        if (this.config.fullscreenView) {
            this.applyHeader2Styles();
        }
        this.excuteSlideHeader();
    };
    return SlideHeader;
}());
exports.default = SlideHeader;
