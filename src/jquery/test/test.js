(function qunitTesting($, QUnit) {
  QUnit.module('slide_downのテスト', {
    beforeEach() {
      window.scroll(0, 0);
      this.header1 = $('.header1');
      this.headerHeight = this.header1.height();
      this.header1.cbSlideDownHeader();
    },
    afterEach() {
      window.scroll(0, 0);
    },
  });

  QUnit.test('$.fn.cbSlideDownHeader()が読み込まれていること', assert => {
    assert.ok($.fn.cbSlideDownHeader, 'Passed!!');
  });

  QUnit.test('メソッドを実行する要素のTOPのデフォルト値は、要素の高さの負の値になっていること', assert => {
    assert.equal(this.header1.css('top'), '-' + this.headerHeight + 'px', 'Passed!!');
  });

  QUnit.test('スクロールした時のヘッダバーのTOPの値が正しいこと', assert => {
    const self = this;
    const done = assert.async();

    console.log(self.header1.css('top'));
    console.log(self.header1.offset().top);
    assert.equal(self.header1.css('top'), `-${self.headerHeight}px`, 'Passed!!');

    window.scroll(0, 500);

    setTimeout(() => {
      console.log(self.header1.css('top'));
      console.log(self.header1.offset().top);
      assert.equal(self.header1.css('top'), '0px', 'Passed!!');
      done();
    }, 1000);
  });

  QUnit.module('slide_upのテスト', {
    beforeEach() {
      window.scroll(0, 0);
      this.header2 = $('.header2');
      this.headerHeight = this.header2.height();
      this.header2.cbSlideUpHeader();
    },
    afterEach() {
      window.scroll(0, 0);
    },
  });

  QUnit.test('$.fn.cbSlideUpHeader()が読み込まれていること', assert => {
    assert.ok($.fn.cbSlideUpHeader, 'Passed!!');
  });

  QUnit.test('メソッドを実行する要素のTOPのデフォルト値は、0pxになっていること', assert => {
    assert.strictEqual(this.header2.css('top'), '0px', 'Passed!!');
  });

  QUnit.test('スクロールした時のヘッダバーのTOPの値が正しいこと', assert => {
    const self = this;
    const done = assert.async();

    console.log(self.header2.css('top'));
    console.log(self.header2.offset());
    assert.equal(self.header2.css('top'), '0px', 'Passed!!');

    window.scroll(0, 1000);

    setTimeout(() => {
      console.log(self.header2.css('top'));
      console.log(self.header2.offset());
      assert.equal(self.header2.css('top'), `-${self.headerHeight}px`, 'Passed!!');
      done();
    }, 1000);
  });
})(jQuery, QUnit);
