
// import page from 'page';
import Schedule from '../../utility/Schedule';
import BaseControllerManager from './BaseControllerManager';

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

    /**
     * @public
     */
    public boot() {

        // _safeBoot
        const schedule = new Schedule();

        schedule.add(this._fx['none --> none'](null, null, null, null, this.controllerManager));

        schedule.done(() => {
            // this.controllerManager.use('current').viewDidAppear();
        });

    }

}