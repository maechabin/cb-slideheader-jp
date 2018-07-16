import SlideHeader from '../slideheader';
import { SlideHeaderModel as SH } from '../slideheader.model';

describe('slideheader', () => {
  let slideheader: SlideHeader;

  beforeEach(() => {
    document.body.innerHTML = `
      <header class="cb-header"></header>
      <div class="cb-header2"></div>
    `;
  });

  describe('constructor', () => {
    it('should work with one argument', () => {
      const expected = document.querySelector('.cb-header');

      slideheader = new SlideHeader('.cb-header');

      expect(slideheader).toBeDefined();
      expect(slideheader.element).toEqual(expected);
    });

    it('should work with two arguments', () => {
      const expected = {
        headroom: false,
      };

      slideheader = new SlideHeader('.cb-header', expected);

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
        slideheader = new SlideHeader('.cb-header');
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
        slideheader.defaults = { TEST: 'AAA' } as any;
        slideheader.options = { TEST: 'BBB' } as any;
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalledWith(slideheader.defaults, slideheader.options);
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
        slideheader = new SlideHeader('.cb-header');
        try {
          slideheader.init('XXX');
        } catch (error) {
          expect(error).toBeTruthy();
        }
      });
    });

    describe('options', () => {
      it('sholud call cloneHeader', () => {
        slideheader = new SlideHeader('.cb-header', {
          cloneHeader: true,
        });
        const spy = jest.spyOn(slideheader, 'cloneHeader');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should call applyHeader2Styles', () => {
        slideheader = new SlideHeader('.cb-header', {
          fullscreenView: true,
        });
        const spy = jest.spyOn(slideheader, 'applyHeader2Styles');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should merge ', () => {
        slideheader = new SlideHeader('.cb-header', {
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
      slideheader = new SlideHeader('.cb-header', {
        headroom: true,
      });
      slideheader.init('slideUp');
      expect(slideheader.isHeadroom).toBeTruthy();
    });

    it('false: slideDown && headroom true', () => {
      slideheader = new SlideHeader('.cb-header', {
        headroom: true,
      });
      slideheader.init('slideDown');
      expect(slideheader.isHeadroom).toBeFalsy();
    });

    it('false: slideUp && headroom false', () => {
      slideheader = new SlideHeader('.cb-header', {
        headroom: false,
      });
      slideheader.init('slideDown');
      expect(slideheader.isHeadroom).toBeFalsy();
    });
  });

  describe('excuteSlideHeader', () => {
    beforeEach(() => {
      slideheader = new SlideHeader('.cb-header');
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
    slideheader = new SlideHeader('.cb-header');
    slideheader.init('slideUp');
    const defaultsDummy = { TEST: 'AAA' };
    const optionsDummy = { TEST: 'bbb' };
    const expectedConfig = (<any>Object).assign({}, defaultsDummy, optionsDummy);

    slideheader.mergeOptions(defaultsDummy, optionsDummy);

    expect(slideheader.config).toEqual(expectedConfig);
  });

  it('applyDefaultHeaderStyles', () => {
    slideheader = new SlideHeader('.cb-header', {
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

  it('handleScroll', () => {
    slideheader = new SlideHeader('.cb-header');
    slideheader.init('slideUp');
    slideheader.slideDirection = SH.SlideType.UP;

    slideheader.handleScroll(SH.SlideType.UP, 123);

    // const style = slideheader.element.style;
    // const expectedSlideDuration = slideheader.config[`slide${SH.SlideType.UP}Duration`];
    // const expectedSlideTiming = slideheader.config[`slide${SH.SlideType.UP}Timing`];
    // expect(style.transition).toBe(`transform ${expectedSlideDuration} ${expectedSlideTiming}`);
    // expect(style.transform).toBe('translate3d(0, 123, 0)');
    expect(slideheader.slideDirection).toBe(SH.SlideType.DOWN);
  });

  xdescribe('listenScroll', () => {
    it('', () => {
      window.scrollTo(0, 0);
      slideheader = new SlideHeader('.cb-header');
      slideheader.init('slideUp');
      const spy = jest.spyOn(slideheader, 'handleScroll');

      slideheader.listenScroll(SH.SlideType.UP, SH.SlideType.DOWN);
      window.dispatchEvent(new Event('scroll'));
      window.scrollTo(0, 100);

      expect(spy).toHaveBeenCalled();
    });
  });

  it('handleTransitionend', () => {
    slideheader = new SlideHeader('.cb-header', {
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
      slideheader = new SlideHeader('.cb-header');
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
});
