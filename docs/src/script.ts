import SlideHeader from '../../dist/slideheader.min';

window.onload = () => {
  new SlideHeader('.cb-header', {
    headroom: true,
    slidePoint: 0,
    fullscreenView: true,
  }).init('slideDown');
};
