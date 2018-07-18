import SlideHeader from '../slideheader';
import { SlideHeaderModel as SH } from '../slideheader.model';

describe('slideheader', () => {
  let slideheader: SlideHeader;

  beforeEach(() => {
    document.body.innerHTML = `
      <header class="header"></header>
      <div class="cb-header2"></div>
      <div style="height: 1000px"></div>
    `;
  });

  describe('constructor', () => {
    it('should work with one argument', () => {
      const expected = document.querySelector('.header');

      slideheader = new SlideHeader('.header');

      expect(slideheader).toBeDefined();
      expect(slideheader.element).toEqual(expected);
    });

    it('should work with two arguments', () => {
      const expected = {
        headroom: false,
      };

      slideheader = new SlideHeader('.header', expected);

      expect(slideheader).toBeDefined();
      expect(slideheader.options).toEqual(expected);
    });

    it('should catch error', () => {
      try {
        slideheader = new SlideHeader('XXX');
      } catch (error) {
        expect(error).toBeTruthy();
      } finally {
        expect(slideheader.init('slideUp')).toBeUndefined();
      }
    });
  });

  describe('init', () => {
    describe('no any options', () => {
      beforeEach(() => {
        slideheader = new SlideHeader('.header');
      });

      it('methodType', () => {
        slideheader.init('slideUp');
        expect(slideheader.methodType).toBe('slideUp');
      });

      it('sholud call a applyDefaultHeaderStyles method', () => {
        const spy = jest.spyOn(slideheader, 'applyDefaultHeaderStyles');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should call a excuteSlideHeader method', () => {
        const spy = jest.spyOn(slideheader, 'excuteSlideHeader');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should call a mergeOptions method', () => {
        const spy = jest.spyOn(slideheader, 'mergeOptions');
        const defaults = slideheader.defaults;
        const options = slideheader.options;
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalledWith(defaults, options);
      });

      it('should not call a cloneHeader method', () => {
        const spy = jest.spyOn(slideheader, 'cloneHeader');
        slideheader.init('slideUp');
        expect(spy).not.toHaveBeenCalled();
      });

      it('should not call a applyHeader2Styles method', () => {
        const spy = jest.spyOn(slideheader, 'applyHeader2Styles');
        slideheader.init('slideUp');
        expect(spy).not.toHaveBeenCalled();
      });

      it('fail', () => {
        slideheader = new SlideHeader('.header');
        try {
          slideheader.init('XXX');
        } catch (error) {
          expect(error).toBeTruthy();
        }
      });
    });

    describe('options', () => {
      it('sholud call cloneHeader', () => {
        slideheader = new SlideHeader('.header', {
          cloneHeader: true,
        });
        const spy = jest.spyOn(slideheader, 'cloneHeader');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should call applyHeader2Styles', () => {
        slideheader = new SlideHeader('.header', {
          fullscreenView: true,
        });
        const spy = jest.spyOn(slideheader, 'applyHeader2Styles');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should merge ', () => {
        slideheader = new SlideHeader('.header', {
          headerBarWidth: '123px',
          zIndex: 123,
          slidePoint: 123,
        });
        slideheader.init('slideDown');
        expect(slideheader.config.headerBarWidth).toBe('123px');
        expect(slideheader.config.zIndex).toBe(123);
        expect(slideheader.config.slidePoint).toBe(123);
      });
    });
  });

  describe('isHeadroom', () => {
    it('true', () => {
      slideheader = new SlideHeader('.header', {
        headroom: true,
      });
      slideheader.init('slideUp');
      expect(slideheader.isHeadroom).toBeTruthy();
    });

    it('false: slideDown && headroom true', () => {
      slideheader = new SlideHeader('.header', {
        headroom: true,
      });
      slideheader.init('slideDown');
      expect(slideheader.isHeadroom).toBeFalsy();
    });

    it('false: slideUp && headroom false', () => {
      slideheader = new SlideHeader('.header', {
        headroom: false,
      });
      slideheader.init('slideDown');
      expect(slideheader.isHeadroom).toBeFalsy();
    });
  });

  describe('excuteSlideHeader', () => {
    beforeEach(() => {
      slideheader = new SlideHeader('.header');
    });

    it('meshodType is SLIDE_DOWN', () => {
      slideheader.init('slideDown');
      const expectedSlideType1 = 'Down';
      const expectedSlideType2 = 'Up';
      const listenScrollSpy = jest.spyOn(slideheader, 'listenScroll');
      const listenTransitionEndSpy = jest.spyOn(slideheader, 'listenTransitionEnd');

      slideheader.excuteSlideHeader();

      expect(listenScrollSpy).toHaveBeenCalledWith(expectedSlideType1, expectedSlideType2);
      expect(listenTransitionEndSpy).toHaveBeenCalledWith(expectedSlideType1, expectedSlideType2);
    });

    it('meshodType is SLIDE_UP', () => {
      slideheader.init('slideUp');
      const expectedSlideType1 = 'Up';
      const expectedSlideType2 = 'Down';
      const listenScrollSpy = jest.spyOn(slideheader, 'listenScroll');
      const listenTransitionEndSpy = jest.spyOn(slideheader, 'listenTransitionEnd');

      slideheader.excuteSlideHeader();

      expect(listenScrollSpy).toHaveBeenCalledWith(expectedSlideType1, expectedSlideType2);
      expect(listenTransitionEndSpy).toHaveBeenCalledWith(expectedSlideType1, expectedSlideType2);
    });
  });

  it('mergeOptions', () => {
    slideheader = new SlideHeader('.header');
    slideheader.init('slideUp');
    const defaultsDummy = { TEST: 'AAA' } as any;
    const optionsDummy = { TEST: 'bbb' } as any;
    const expectedConfig = (<any>Object).assign({}, defaultsDummy, optionsDummy);

    const recievedConfig = slideheader.mergeOptions(defaultsDummy, optionsDummy);

    expect(recievedConfig).toEqual(expectedConfig);
  });

  it('applyDefaultHeaderStyles', () => {
    slideheader = new SlideHeader('.header', {
      opacity: 0.3,
      headerBarWidth: '50%',
      zIndex: 123,
    });
    slideheader.init('slideUp');
    const style = slideheader.element.style;

    slideheader.applyDefaultHeaderStyles();

    expect(style.transform).toBe('translate3d(0, 0, 0)');
    expect(style.visibility).toBe('visible');
    expect(style.opacity).toBe('0.3');
    expect(style.width).toBe('50%');
    expect(style.zIndex).toBe('123');
  });

  it('controlHeaderAnimations', () => {
    slideheader = new SlideHeader('.header');
    slideheader.init('slideUp');
    slideheader.slideDirection = SH.SlideType.UP;

    slideheader.controlHeaderAnimations(SH.SlideType.UP, 123);

    const style = slideheader.element.style;
    const expectedSlideDuration = slideheader.config[`slide${SH.SlideType.UP}Duration`];
    const expectedSlideTiming = slideheader.config[`slide${SH.SlideType.UP}Timing`];

    expect(style.transition).toBe(`transform ${expectedSlideDuration} ${expectedSlideTiming}`);
    expect(style.transform).toBe('translate3d(0, 123, 0)');
    expect(slideheader.slideDirection).toBe(SH.SlideType.DOWN);
  });

  describe('handleScroll', () => {
    beforeEach(() => {
      slideheader = new SlideHeader('.header');
      slideheader.init('slideUp');
    });

    describe('current > slidePoint && current > start', () => {
      it('slideDirection === SH.SlideType.UP', () => {
        slideheader.config.slidePoin = 0;
        slideheader.slideDirection = SH.SlideType.UP;
        slideheader.config.headerBarHeight = 10;
        const spy = jest.spyOn(slideheader, 'controlHeaderAnimations');
        const currentScrollTop = 100;
        const startingScrollTop = 10;
        const slideType = SH.SlideType.UP;
        const expectedHeaderBarHeight = `-${slideheader.config.headerBarHeight}px`;

        slideheader.handleScroll(currentScrollTop, startingScrollTop, slideType);

        expect(spy).toHaveBeenCalledWith(slideType, expectedHeaderBarHeight);
      });

      it('slideDirection === SH.SlideType.DOWN', () => {
        slideheader.config.slidePoin = 0;
        slideheader.slideDirection = SH.SlideType.DOWN;
        const spy = jest.spyOn(slideheader, 'controlHeaderAnimations');
        const currentScrollTop = 100;
        const startingScrollTop = 10;
        const slideType = SH.SlideType.UP;

        slideheader.handleScroll(currentScrollTop, startingScrollTop, slideType);

        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('current > slidePoint && current < start', () => {
      it('slideDirection === SH.SlideType.UP', () => {
        slideheader.config.slidePoin = 0;
        slideheader.slideDirection = SH.SlideType.UP;
        const spy = jest.spyOn(slideheader, 'controlHeaderAnimations');
        const currentScrollTop = 100;
        const startingScrollTop = 200;
        const slideType = SH.SlideType.UP;

        slideheader.handleScroll(currentScrollTop, startingScrollTop, slideType);

        expect(spy).not.toHaveBeenCalled();
      });

      it('slideDirection === SH.SlideType.DOWN', () => {
        slideheader.config.slidePoin = 0;
        slideheader.slideDirection = SH.SlideType.DOWN;
        slideheader.config.headerBarHeight = 10;
        const spy = jest.spyOn(slideheader, 'controlHeaderAnimations');
        const currentScrollTop = 100;
        const startingScrollTop = 200;
        const slideType = SH.SlideType.UP;
        const expectedHeaderBarHeight = 0;

        slideheader.handleScroll(currentScrollTop, startingScrollTop, slideType);

        expect(spy).toHaveBeenCalledWith(slideType, expectedHeaderBarHeight);
      });
    });
  });

  it('listenScroll', done => {
    slideheader = new SlideHeader('.header');
    slideheader.init('slideUp');
    const spy = jest.spyOn(slideheader, 'handleScroll');

    slideheader.listenScroll(SH.SlideType.UP, SH.SlideType.DOWN);
    window.dispatchEvent(new Event('scroll'));

    window.requestAnimationFrame(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('handleTransitionend', () => {
    slideheader = new SlideHeader('.header', {
      slideUpCallback: () => 'aaa',
    });
    slideheader.init('slideUp');
    const spy = jest.spyOn(slideheader.config, `slide${SH.SlideType.UP}Callback`);
    const style = slideheader.element.style;

    slideheader.handleTransitionend(SH.SlideType.UP, 'AAA');

    expect(spy).toHaveBeenCalled();
    expect(style.boxShadow).toBe('AAA');
  });

  describe('listenTransitionEnd', () => {
    beforeEach(() => {
      slideheader = new SlideHeader('.header');
    });

    it('slideDown && slideDirection is Up', () => {
      slideheader.init('slideDown');
      slideheader.slideDirection = SH.SlideType.UP;
      slideheader.config.boxShadow = 'AAA';
      const spy = jest.spyOn(slideheader, 'handleTransitionend');

      slideheader.listenTransitionEnd(SH.SlideType.DOWN, SH.SlideType.UP);
      window.dispatchEvent(new Event('transitionend'));

      expect(spy).toHaveBeenCalledWith(SH.SlideType.DOWN, 'AAA');
    });

    it('slideDown && slideDirection is Down', () => {
      slideheader.init('slideDown');
      slideheader.slideDirection = SH.SlideType.DOWN;
      slideheader.config.boxShadow = 'AAA';
      const spy = jest.spyOn(slideheader, 'handleTransitionend');

      slideheader.listenTransitionEnd(SH.SlideType.DOWN, SH.SlideType.UP);
      window.dispatchEvent(new Event('transitionend'));

      expect(spy).toHaveBeenCalledWith(SH.SlideType.UP, 'none');
    });

    it('slideUp && slideDirection is Up', () => {
      slideheader.init('slideUp');
      slideheader.slideDirection = SH.SlideType.UP;
      slideheader.config.boxShadow = 'AAA';
      const spy = jest.spyOn(slideheader, 'handleTransitionend');

      slideheader.listenTransitionEnd(SH.SlideType.UP, SH.SlideType.DOWN);
      window.dispatchEvent(new Event('transitionend'));

      expect(spy).toHaveBeenCalledWith(SH.SlideType.UP, 'none');
    });

    it('slideUp && slideDirection is Down', () => {
      slideheader.init('slideUp');
      slideheader.slideDirection = SH.SlideType.DOWN;
      slideheader.config.boxShadow = 'AAA';
      const spy = jest.spyOn(slideheader, 'handleTransitionend');

      slideheader.listenTransitionEnd(SH.SlideType.UP, SH.SlideType.DOWN);
      window.dispatchEvent(new Event('transitionend'));

      expect(spy).toHaveBeenCalledWith(SH.SlideType.DOWN, 'AAA');
    });
  });

  it('cloneHeader', () => {
    slideheader = new SlideHeader('.header');
    slideheader.init('slideUp');
    slideheader.cloneHeader();

    const clonedElement = slideheader.element.nextElementSibling as HTMLElement;
    expect(clonedElement.getAttribute('class')).not.toBe('header');
    expect(clonedElement.getAttribute('class')).toBe('cb-header1');
    expect(clonedElement.style.zIndex).toBe('10000');
  });

  describe('applyHeader2Styles', () => {
    let header2: HTMLElement;

    beforeEach(() => {
      header2 = document.querySelector('.cb-header2') as HTMLElement;
      Object.defineProperty(header2, 'clientHeight', {
        value: 100,
        writable: false,
      });
      Object.defineProperty(window, 'outerHeight', {
        value: 500,
        writable: true,
      });

      slideheader = new SlideHeader('.header', {
        fullscreenView: true,
        cloneHeader: true,
      });
      slideheader.init('slideUp');
    });

    it('windowHeight > headerHeight', () => {
      Object.defineProperty(slideheader.element, 'clientHeight', {
        value: 100,
        writable: false,
      });
      const expectedPadding = (500 - 200 + 100) / 2;

      slideheader.applyDefaultHeaderStyles();

      expect(header2.style.paddingTop).toBe(`${expectedPadding}px`);
      expect(header2.style.paddingBottom).toBe(`${expectedPadding}px`);
      expect(slideheader.config.slidePoint).toBe(500);
    });
  });
});
