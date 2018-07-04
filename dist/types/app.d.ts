import { SlideHeaderModel } from './app.model';
export declare class SlideHeader {
    element: Element;
    methodType: SlideHeaderModel.METHOD_TYPE;
    slideDirection: SlideHeaderModel.SLIDE_TYPE;
    config: SlideHeaderModel.Option;
    options: SlideHeaderModel.Option;
    defaults: SlideHeaderModel.Option;
    constructor(element: string, options: SlideHeaderModel.Option);
    handleScroll(top: number | string, slideType: SlideHeaderModel.SLIDE_TYPE): void;
    handleTransitionend(slideType: SlideHeaderModel.SLIDE_TYPE, style: string): void;
    runSlideHeader(): void;
    applyStyle(): void;
    cloneHeader(): void;
    changeHeaderHeight(): void;
    init(type?: SlideHeaderModel.METHOD_TYPE): void;
}
declare global {
    interface Window {
        SlideHeader: any;
    }
}
