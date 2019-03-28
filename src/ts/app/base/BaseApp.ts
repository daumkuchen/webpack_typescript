import VcRouter from '../routers/VcRouter';
import BaseControllerManager from './BaseControllerManager';

import Schedule from '../../utility/Schedule';

export default class BaseApp {
    
    public controllerManager: any;

    public _fx: any;

    public sendAnalytics: any;

    constructor(public FxRouter: any, public VcRouter: any, public useAjax: boolean) {

        /**
         *
         * @type {BaseControllerManager}
         * @public
         */
        this.controllerManager = new BaseControllerManager(VcRouter);

        /**
         * @type {Object}
         * @public
         */
        this._fx = FxRouter;

        /**
         *
         * @type {boolean}
         * @public
         */
        this.useAjax = useAjax;

    }
    
    public boot() {

        // old safeBoot
        const schedule = new Schedule();

        schedule.add(this._fx['none --> none'](null, null, null, null, this.controllerManager));

        schedule.done(() => {
            // this.controllerManager.use('current').viewDidAppear();
        });

    }

    public baseBoot() {

        // not use Router

        let viewController = new BaseControllerManager(VcRouter).getController(document.querySelector('.page-content').getAttribute('id'));
        
        window.addEventListener('DOMContentLoaded', () => {

            viewController.viewWillLoad();

            setTimeout( () => {
                viewController.viewDidLoad();
            }, 500 );

        }, false );

        window.addEventListener('load', () => {

            viewController.viewWillAppear();

            setTimeout( () => {
                viewController.viewDidAppear();
            }, 500 );

        }, false );

    }

}