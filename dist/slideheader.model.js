"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SlideHeaderModel;
(function (SlideHeaderModel) {
    var SlideType;
    (function (SlideType) {
        SlideType["UP"] = "Up";
        SlideType["DOWN"] = "Down";
    })(SlideType = SlideHeaderModel.SlideType || (SlideHeaderModel.SlideType = {}));
    var MethodType;
    (function (MethodType) {
        MethodType["SLIDE_DOWN"] = "slideDown";
        MethodType["SLIDE_UP"] = "slideUp";
    })(MethodType = SlideHeaderModel.MethodType || (SlideHeaderModel.MethodType = {}));
    var SlideTiming;
    (function (SlideTiming) {
        SlideTiming["EASE"] = "ease";
        SlideTiming["LINEAR"] = "linear";
        SlideTiming["EASE_IN"] = "ease-in";
        SlideTiming["EASE_OUT"] = "ease-out";
        SlideTiming["EASE_IN_OUT"] = "ease-in-out";
    })(SlideTiming = SlideHeaderModel.SlideTiming || (SlideHeaderModel.SlideTiming = {}));
})(SlideHeaderModel = exports.SlideHeaderModel || (exports.SlideHeaderModel = {}));
