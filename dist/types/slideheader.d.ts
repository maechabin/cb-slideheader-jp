import { SlideHeaderModel as SH } from './slideheader.model';
export default class SlideHeader {
    /** 対象となるヘッダーバー要素 */
    element: HTMLElement;
    /** メソッドタイプ */
    methodType: SH.MethodType;
    /** ヘッダバーのスライドの方向 */
    slideDirection: SH.SlideType;
    /** オプション設定 */
    config: SH.Option;
    /** ユーザーが指定するオプション設定 */
    options: SH.Option;
    /** デフォルトのオプション設定 */
    defaults: SH.Option;
    /** headroomオプジョンが有効かどうか */
    readonly isHeadroom: boolean;
    /**
     * インスタンスを生成する
     * @param element
     * @param options
     */
    constructor(element: string, options?: SH.Option);
    /**
     * ヘッダーバーのアニメーションを制御する
     * @param top
     * @param slideType
     */
    controlHeaderAnimations(slideType: SH.SlideType, top: number | string): void;
    /**
     * ブラウザをスクロールした時に呼び出される処理
     * @param currentScrollTop
     * @param startingScrollTop
     * @param slideType
     */
    handleScroll(currentScrollTop: number, startingScrollTop: number, slideType: SH.SlideType): void;
    /**
     * scrollイベントを監視する
     * @param slideType1
     * @param slideType2
     */
    listenScroll(slideType1: SH.SlideType, slideType2: SH.SlideType): void;
    /**
     * ヘッダーバーのアニメーションが終わった時に呼び出される処理
     * @param slideType
     * @param style
     */
    handleTransitionend(slideType: SH.SlideType, style: string): void;
    /**
     * TransitionEndイベントを監視する
     * @param slideType1
     * @param slideType2
     */
    listenTransitionEnd(slideType1: SH.SlideType, slideType2: SH.SlideType): void;
    /**
     * SlideHeaderのメイン処理
     */
    excuteSlideHeader(): void;
    /**
     * ヘッダーバーの初期スタイルを適用する
     */
    applyDefaultHeaderStyles(): void;
    /**
     * ヘッダーバーを複製する
     * cloneHeaderがtrueの時のみ呼び出される
     */
    cloneHeader(): void;
    /**
     * フルスクリーン要素（header2）の高さを適用する
     * fullscreenViewがtrueの時のみ呼び出される
     */
    applyHeader2Styles(): void;
    /**
     * オプションをマージする
     * @param defaults
     * @param options
     */
    mergeOptions(defaults: SH.Option, options: SH.Option): SH.Option;
    /**
     * インスタンスを初期化する
     * @param type
     */
    init(type: string): void;
}
