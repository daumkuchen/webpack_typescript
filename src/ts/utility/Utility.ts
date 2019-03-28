import Color from './Color';

// import CustomEase from '../vendors/CustomEase.min.js';
// const CustomEase = require('../vendors/CustomEase.min.js');

export default class Utility {

    static getCubicCurve(a, b, c, d) {
        // @ts-ignore
        return CustomEase.create('custom', `M0,0 C${Number(a)},${Number(b)} ${Number(c)},${Number(d)} 1,1`);
    }
    
    static hexToRgb(hexCode) {
        return Color.hexToRgb(hexCode);
    }

    static rgbToHex(R, G, B) {
        return Color.rgbToHex(R, G, B);
    }

    static noScroll() {
        // PC
        let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        // $(document).on(scroll_event,function(e){e.preventDefault();});
        // SP
        // $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
    }

    static returnScroll() {
        // PC
        let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        // $(document).off(scroll_event);
        // SP
        // $(document).off('.noScroll');
    }

    static getOffset(type, elm) {

        let rect = elm.getBoundingClientRect();
        let st = window.pageYOffset || document.documentElement.scrollTop;

        if(type == 'top') return rect.top + st;
        if(type == 'left') return rect.left;

    }

}