// import App from './app/App';
// import FxRouter from './app/routers/FxRouter';
// import VcRouter from './app/routers/VcRouter';
import BaseApp from './app/base/BaseApp';

import Utility from './utility/Utility';
import UserAgent from './utility/UserAgent';

// @ts-ignore
// require('waypoints/lib/noframework.waypoints.min.js');

// @ts-ignore
require('./_dev');


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

        WAYPOINT: any[];

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
 * @type {APP}
 * @public
 */

// window.APP = new App(FxRouter, VcRouter, false);
// // @ts-ignore
// window.APP.debug = process.env.NODE_ENV === 'development';
// window.APP.boot();

window.APP = new BaseApp(null, null, false);
window.APP.baseBoot();


/**
 *
 * @type {resize}
 * @public
 */
const INIT_WIDTH: number = window.innerWidth;

window.addEventListener('resize', () => {
    if(INIT_WIDTH > 768) {
        if (window.innerWidth <= 768) {
            location.reload();
        }
    } else {
        if (window.innerWidth > 768) {
            location.reload();
        }
    }
}, false);


/**
 *
 * @type {Waypoint}
 * @public
 */
// window.WAYPOINT =[];

// let triger_fix = document.querySelectorAll<HTMLElement>('.js-waypoint__fix');
// for (let i = 0; i < triger_fix.length; i++) {

//     let waypoint = new Waypoint({
//         element: triger_fix[i],
//         handler: function(direction) {

//             this.element.classList.add('is-start');

//             setTimeout(() => {
//                 this.element.classList.add('is-end');
//             }, 750);

//         },
//         offset: '75%'
//     });

//     window.WAYPOINT.push(waypoint);

// }