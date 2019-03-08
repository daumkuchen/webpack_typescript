import App from './app/App';
import FxRouter from './app/routers/FxRouter';
import VcRouter from './app/routers/VcRouter';

import Utility from './utility/Utility';
import UserAgent from './utility/UserAgent';
require( './_dev' );

/**
 *
 * @type {GlobalVariable}
 * @public
 */

declare global {
    interface Window {

        ua: any;
        uaName: any;
        MOBILE: boolean;
        TABLET: boolean;
        OTHER: boolean;
        IE: boolean;

        WHEEL_RATIO: any;
        page_initialized: boolean;

        APP: any;

    }
}

window.ua = new UserAgent();
window.uaName = window.ua.getBrowser();
window.MOBILE = window.ua.mobile;
window.TABLET = window.ua.tablet;
window.OTHER = !window.MOBILE && !window.TABLET;
window.IE = window.uaName.match(/ie/);
window.WHEEL_RATIO = 'firefox' === window.uaName ? 100 : 1;
window.page_initialized = false;

/**
 *
 * @type {App}
 * @public
 */

window.APP = new App(FxRouter, VcRouter, false);
window.APP.debug = process.env.NODE_ENV === 'development';
window.APP.boot();


/**
 *
 * @type {resize}
 * @public
 */
const init_width: number = window.innerWidth;

window.addEventListener('resize', () => {
    if(init_width > 768) {
        if (window.innerWidth <= 768) {
            location.reload();
        }
    } else {
        if (window.innerWidth > 768) {
            location.reload();
        }
    }
}, false);