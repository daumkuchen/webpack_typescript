import Color from './Color';
import CustomEase from "./CustomEase.min";

export default class Utility {

    /**
     *
     * @param a {Number}
     * @param b {Number}
     * @param c {Number}
     * @param d {Number}
     * @return { * }
     */
    static getCubicCurve(a, b, c, d) {
        return CustomEase.create("custom", `M0,0 C${Number( a )},${Number( b )} ${Number( c )},${Number( d )} 1,1`);
    }

    /**
     * @param {String} hexCode
     * @return {Array} RGB
     */
    static hexToRgb(hexCode) {
        return Color.hexToRgb(hexCode);
    }

    /*
     * @param {Number} R
     * @param {Number} G
     * @param {Number} B
     * @return {String} hexCode
     */
    static rgbToHex(R, G, B) {
        return Color.rgbToHex(R, G, B);
    }

    /**
     *
     */
    static noScroll(){
        // PC
        let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        // $(document).on(scroll_event,function(e){e.preventDefault();});
        // SP
        // $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
    }

    /**
     *
     */
    static returnScroll(){
        // PC
        let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        // $(document).off(scroll_event);
        // SP
        // $(document).off('.noScroll');
    }

}