import SlideHeader from './slideheader';

export default SlideHeader;

declare global {
  interface Window {
    SlideHeader: any;
  }
}

window.SlideHeader = SlideHeader;
