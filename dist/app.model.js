"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SlideHeaderModel;
(function (SlideHeaderModel) {
    let SLIDE_TYPE;
    (function (SLIDE_TYPE) {
        SLIDE_TYPE["UP"] = "Up";
        SLIDE_TYPE["DOWN"] = "Down";
    })(SLIDE_TYPE = SlideHeaderModel.SLIDE_TYPE || (SlideHeaderModel.SLIDE_TYPE = {}));
    let METHOD_TYPE;
    (function (METHOD_TYPE) {
        METHOD_TYPE["SLIDE_DOWN"] = "slideDown";
        METHOD_TYPE["SLIDE_UP"] = "slideUp";
    })(METHOD_TYPE = SlideHeaderModel.METHOD_TYPE || (SlideHeaderModel.METHOD_TYPE = {}));
    let SLIDE_TIMING;
    (function (SLIDE_TIMING) {
        SLIDE_TIMING["EASE"] = "ease";
        SLIDE_TIMING["LINEAR"] = "linear";
        SLIDE_TIMING["EASE_IN"] = "ease-in";
        SLIDE_TIMING["EASE_OUT"] = "ease-out";
        SLIDE_TIMING["EASE_IN_OUT"] = "ease-in-out";
    })(SLIDE_TIMING = SlideHeaderModel.SLIDE_TIMING || (SlideHeaderModel.SLIDE_TIMING = {}));
})(SlideHeaderModel = exports.SlideHeaderModel || (exports.SlideHeaderModel = {}));
