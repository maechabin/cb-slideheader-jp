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
})({3:[function(require,module,exports) {
var define;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

parcelRequire = function (e, r, n, t) {
  function i(n, t) {
    function o(e) {
      return i(o.resolve(e));
    }function c(r) {
      return e[n][1][r] || r;
    }if (!r[n]) {
      if (!e[n]) {
        var l = "function" == typeof parcelRequire && parcelRequire;if (!t && l) return l(n, !0);if (u) return u(n, !0);if (f && "string" == typeof n) return f(n);var p = new Error("Cannot find module '" + n + "'");throw p.code = "MODULE_NOT_FOUND", p;
      }o.resolve = c;var a = r[n] = new i.Module(n);e[n][0].call(a.exports, o, a, a.exports, this);
    }return r[n].exports;
  }function o(e) {
    this.id = e, this.bundle = i, this.exports = {};
  }var u = "function" == typeof parcelRequire && parcelRequire,
      f = "function" == typeof require && require;i.isParcelRequire = !0, i.Module = o, i.modules = e, i.cache = r, i.parent = u;for (var c = 0; c < n.length; c++) {
    i(n[c]);
  }if (n.length) {
    var l = i(n[n.length - 1]);"object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : t && (this[t] = l);
  }return i;
}({ 3: [function (require, module, exports) {
    "use strict";
    var e;exports.__esModule = !0, function (e) {
      !function (e) {
        e.UP = "Up", e.DOWN = "Down";
      }(e.SLIDE_TYPE || (e.SLIDE_TYPE = {})), function (e) {
        e.SLIDE_DOWN = "slideDown", e.SLIDE_UP = "slideUp";
      }(e.METHOD_TYPE || (e.METHOD_TYPE = {})), function (e) {
        e.EASE = "ease", e.LINEAR = "linear", e.EASE_IN = "ease-in", e.EASE_OUT = "ease-out", e.EASE_IN_OUT = "ease-in-out";
      }(e.SLIDE_TIMING || (e.SLIDE_TIMING = {}));
    }(e = exports.SlideHeaderModel || (exports.SlideHeaderModel = {}));
  }, {}], 1: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0;var e = require("./app.model"),
        i = function () {
      function i(i, t) {
        this.methodType = e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN, this.slideDirection = e.SlideHeaderModel.SLIDE_TYPE.UP, this.element = document.querySelector(i), this.options = t, this.defaults = { headerBarHeight: this.element.clientHeight, headerBarWidth: "100%", header2SelectorName: ".cb-header2", zIndex: 9999, boxShadow: "none", opacity: 1, slidePoint: 0, slideDownDuration: "500ms", slideUpDuration: "500ms", slideDownTiming: e.SlideHeaderModel.SLIDE_TIMING.EASE, slideUpTiming: e.SlideHeaderModel.SLIDE_TIMING.EASE, slideDownCallback: function slideDownCallback() {}, slideUpCallback: function slideUpCallback() {}, isCloneHeader: !1, isFullscreenView: !1, isHeadroom: !1 };
      }return i.prototype.handleScroll = function (i, t) {
        var d,
            n = this,
            o = this.config["slide" + t + "Duration"],
            l = this.config["slide" + t + "Timing"];cancelAnimationFrame(d), d = requestAnimationFrame(function () {
          n.element.setAttribute("style", "\n          transition: transform " + o + " " + l + ";\n          transform: translate3d(0, " + i + ", 0);\n        ");
        }), this.slideDirection = this.slideDirection === e.SlideHeaderModel.SLIDE_TYPE.UP ? e.SlideHeaderModel.SLIDE_TYPE.DOWN : e.SlideHeaderModel.SLIDE_TYPE.UP;
      }, i.prototype.handleTransitionend = function (e, i) {
        this.config["slide" + e + "Callback"];
      }, i.prototype.runSlideHeader = function () {
        var i = this,
            t = this.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? 0 : "-" + this.config.headerBarHeight + "px",
            d = this.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? "-" + this.config.headerBarHeight + "px" : 0,
            n = this.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? e.SlideHeaderModel.SLIDE_TYPE.DOWN : e.SlideHeaderModel.SLIDE_TYPE.UP,
            o = this.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? e.SlideHeaderModel.SLIDE_TYPE.UP : e.SlideHeaderModel.SLIDE_TYPE.DOWN,
            l = 0,
            r = 0,
            s = "\n      box-shadow: " + this.config.boxShadow + ";\n      transition: 'box-shadow .9s linear',\n    ",
            a = "\n      box-shadow: none;\n    ",
            h = this.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? s : a,
            c = this.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? a : s;window.addEventListener("scroll", function () {
          r = window.scrollY, i.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_UP && i.config.isHeadroom ? (r > l && r > i.config.slidePoint ? i.slideDirection === e.SlideHeaderModel.SLIDE_TYPE.UP && i.handleScroll(t, n) : i.slideDirection === e.SlideHeaderModel.SLIDE_TYPE.DOWN && i.handleScroll(d, o), l = r) : r > i.config.slidePoint ? i.slideDirection === e.SlideHeaderModel.SLIDE_TYPE.UP && i.handleScroll(t, n) : i.slideDirection === e.SlideHeaderModel.SLIDE_TYPE.DOWN && i.handleScroll(d, o);
        }, !1), window.addEventListener("transitionend", function () {
          i.slideDirection === e.SlideHeaderModel.SLIDE_TYPE.UP ? i.handleTransitionend(n, h) : i.handleTransitionend(o, c);
        }, !1);
      }, i.prototype.applyStyle = function () {
        var i = this.methodType === e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN ? "-" + this.config.headerBarHeight + "px" : 0;this.element.setAttribute("style", "\n        transform: translate3d(0, " + i + ", 0);\n        visibility: 'visible';\n        opacity: " + this.config.opacity + ";\n        width: " + this.config.headerBarWidth + ";\n        zIndex: " + this.config.zIndex + ";\n      ");
      }, i.prototype.cloneHeader = function () {
        var e = this.element.cloneNode(!0);this.element.parentNode.insertBefore(e, this.element.nextElementSibling), e.removeAttribute("class"), e.setAttribute("class", "cb-header1"), e.setAttribute("style", "\n        'z-index': 10000;\n      ");
      }, i.prototype.changeHeaderHeight = function () {
        var e = this.element.clientHeight,
            i = document.querySelector(this.config.header2SelectorName),
            t = e + i.clientHeight,
            d = window.outerHeight,
            n = null;d > t ? (n = this.config.isCloneHeader ? (d - t) / 2 : (d - t + e) / 2, this.config.slidePoint = d, i.setAttribute("style", "\n          'padding-top': " + n + "px;\n          'padding-bottom': " + n + "px;\n        ")) : this.config.isCloneHeader ? this.config.slidePoint = t : this.config.slidePoint = t - e;
      }, i.prototype.init = function (i) {
        !i || i !== e.SlideHeaderModel.METHOD_TYPE.SLIDE_UP && i !== e.SlideHeaderModel.METHOD_TYPE.SLIDE_DOWN || (this.methodType = i), this.config = Object.assign({}, this.defaults, this.options), this.config.isCloneHeader && this.cloneHeader(), this.applyStyle(), this.config.isFullscreenView && this.changeHeaderHeight(), this.runSlideHeader();
      }, i;
    }();exports.SlideHeader = i, window.SlideHeader = i;
  }, { "./app.model": 3 }] }, {}, [1], null);
//# sourceMappingURL=/slideheader.min.map
},{}],1:[function(require,module,exports) {
'use strict';

var _slideheader = require('../dist/slideheader.min');

window.onload = function () {
  new _slideheader.SlideHeader('.cb-header', {
    isHeadroom: true,
    slidePoint: 64
  }).init('slideUp');
};
},{"../dist/slideheader.min":3}],5:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56595' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[5,1], null)
//# sourceMappingURL=/test.map