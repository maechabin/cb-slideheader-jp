import SlideHeader from '../slideheader';

describe('slideheader', () => {
  let slideheader: SlideHeader;

  beforeEach(() => {
    document.body.innerHTML = `
      <header class="cb-header"></header>
      <div class="cb-header2"></div>
    `;
  });

  describe('instance', () => {
    it('should work with one argument', () => {
      slideheader = new SlideHeader('.cb-header');
      expect(slideheader).toBeDefined();
    });

    it('should work with two arguments', () => {
      slideheader = new SlideHeader('.cb-header', {
        headroom: false,
      });
      expect(slideheader).toBeDefined();
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

      it('sholud call applyDefaultHeaderStyles', () => {
        const spy = jest.spyOn(slideheader, 'applyDefaultHeaderStyles');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should call excuteSlideHeader', () => {
        const spy = jest.spyOn(slideheader, 'excuteSlideHeader');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });

      it('should not call cloneHeader', () => {
        const spy = jest.spyOn(slideheader, 'cloneHeader');
        slideheader.init('slideUp');
        expect(spy).not.toHaveBeenCalled();
      });

      it('should not call applyHeader2Styles', () => {
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

      it('sholud call applyHeader2Styles', () => {
        slideheader = new SlideHeader('.cb-header', {
          fullscreenView: true,
        });
        const spy = jest.spyOn(slideheader, 'applyHeader2Styles');
        slideheader.init('slideUp');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
