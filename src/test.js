import { SlideHeader } from '../dist/slideheader.min';

window.onload = () => {
  new SlideHeader('.cb-header', {
    isHeadroom: true,
    slidePoint: 64,
  }).init('slideUp');
};
