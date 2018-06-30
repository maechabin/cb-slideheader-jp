// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var SlideHeaderModel;
(function (SlideHeaderModel) {
    var SLIDE_TYPE;
    (function (SLIDE_TYPE) {
        SLIDE_TYPE["UP"] = "Up";
        SLIDE_TYPE["DOWN"] = "Down";
    })(SLIDE_TYPE = SlideHeaderModel.SLIDE_TYPE || (SlideHeaderModel.SLIDE_TYPE = {}));
    var METHOD_TYPE;
    (function (METHOD_TYPE) {
        METHOD_TYPE["SLIDE_DOWN"] = "slideDown";
        METHOD_TYPE["SLIDE_UP"] = "slideUp";
    })(METHOD_TYPE = SlideHeaderModel.METHOD_TYPE || (SlideHeaderModel.METHOD_TYPE = {}));
    var SLIDE_TIMING;
    (function (SLIDE_TIMING) {
        SLIDE_TIMING["EASE"] = "ease";
        SLIDE_TIMING["LINEAR"] = "linear";
        SLIDE_TIMING["EASE_IN"] = "ease-in";
        SLIDE_TIMING["EASE_OUT"] = "ease-out";
        SLIDE_TIMING["EASE_IN_OUT"] = "ease-in-out";
    })(SLIDE_TIMING = SlideHeaderModel.SLIDE_TIMING || (SlideHeaderModel.SLIDE_TIMING = {}));
})(SlideHeaderModel = exports.SlideHeaderModel || (exports.SlideHeaderModel = {}));
},{}],1:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var app_model_1 = require("./app.model");
var SlideHeader = /** @class */function () {
    function SlideHeader(element, options) {
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
            slideDownCallback: function slideDownCallback() {},
            slideUpCallback: function slideUpCallback() {},
            isCloneHeader: false,
            isFullscreenView: false,
            isHeadroom: false
        };
    }
    SlideHeader.prototype.handleScroll = function (top, slideType) {
        var _this = this;
        var slideDuration = this.config["slide" + slideType + "Duration"];
        var slideTiming = this.config["slide" + slideType + "Timing"];
        var frameId;
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(function () {
            _this.element.setAttribute('style', "\n          transition: transform " + slideDuration + " " + slideTiming + ";\n          transform: translate3d(0, " + top + ", 0);\n        ");
        });
        this.slideDirection = this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP ? app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN : app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
    };
    SlideHeader.prototype.handleTransitionend = function (slideType, style) {
        this.config["slide" + slideType + "Callback"];
        //this.element.setAttribute('style', style);
    };
    SlideHeader.prototype.runSlideHeader = function () {
        var _this = this;
        var top1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? 0 : "-" + this.config.headerBarHeight + "px";
        var top2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? "-" + this.config.headerBarHeight + "px" : 0;
        var slideType1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN : app_model_1.SlideHeaderModel.SLIDE_TYPE.UP;
        var slideType2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? app_model_1.SlideHeaderModel.SLIDE_TYPE.UP : app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN;
        var startingScrollTop = 0; // スライドの開始位置
        var currentScrollTop = 0; // 現在のスクロールの位置
        var style1 = "\n      box-shadow: " + this.config.boxShadow + ";\n      transition: 'box-shadow .9s linear',\n    ";
        var style2 = "\n      box-shadow: none;\n    ";
        var css1 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style1 : style2;
        var css2 = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? style2 : style1;
        window.addEventListener('scroll', function () {
            currentScrollTop = window.scrollY;
            if (_this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_UP && _this.config.isHeadroom) {
                /** Headroom時 */
                if (currentScrollTop > startingScrollTop && currentScrollTop > _this.config.slidePoint) {
                    if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                        _this.handleScroll(top1, slideType1);
                    }
                } else {
                    if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.DOWN) {
                        _this.handleScroll(top2, slideType2);
                    }
                }
                startingScrollTop = currentScrollTop;
            } else {
                /** 通常時（Headroomじゃない時） */
                if (currentScrollTop > _this.config.slidePoint) {
                    /** スクロール位置がスライドポイントより大きくなった場合 */
                    if (_this.slideDirection === app_model_1.SlideHeaderModel.SLIDE_TYPE.UP) {
                        _this.handleScroll(top1, slideType1);
                    }
                } else {
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
            } else {
                _this.handleTransitionend(slideType2, css2);
            }
        }, false);
    };
    SlideHeader.prototype.applyStyle = function () {
        var top = this.methodType === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? "-" + this.config.headerBarHeight + "px" : 0;
        this.element.setAttribute('style', "\n        transform: translate3d(0, " + top + ", 0);\n        visibility: 'visible';\n        opacity: " + this.config.opacity + ";\n        width: " + this.config.headerBarWidth + ";\n        zIndex: " + this.config.zIndex + ";\n      ");
    };
    SlideHeader.prototype.cloneHeader = function () {
        var clonedElement = this.element.cloneNode(true);
        this.element.parentNode.insertBefore(clonedElement, this.element.nextElementSibling);
        clonedElement.removeAttribute('class');
        clonedElement.setAttribute('class', 'cb-header1');
        clonedElement.setAttribute('style', "\n        'z-index': 10000;\n      ");
    };
    SlideHeader.prototype.changeHeaderHeight = function () {
        var headerBarHeight = this.element.clientHeight;
        var header2 = document.querySelector(this.config.header2SelectorName);
        var headerHeight = headerBarHeight + header2.clientHeight;
        var windowHeight = window.outerHeight;
        var padding = null;
        if (windowHeight > headerHeight) {
            if (this.config.isCloneHeader) {
                padding = (windowHeight - headerHeight) / 2;
            } else {
                padding = (windowHeight - headerHeight + headerBarHeight) / 2;
            }
            this.config.slidePoint = windowHeight;
            header2.setAttribute('style', "\n          'padding-top': " + padding + "px;\n          'padding-bottom': " + padding + "px;\n        ");
        } else {
            if (this.config.isCloneHeader) {
                this.config.slidePoint = headerHeight;
            } else {
                this.config.slidePoint = headerHeight - headerBarHeight;
            }
        }
    };
    SlideHeader.prototype.init = function (type) {
        if (type && (type === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_UP || type === app_model_1.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN)) {
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
    };
    return SlideHeader;
}();
exports.SlideHeader = SlideHeader;
window.SlideHeader = SlideHeader;
},{"./app.model":4}]},{},[1], "slideheader")
//# sourceMappingURL=/slideheader.map