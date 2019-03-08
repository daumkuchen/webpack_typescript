export default class BaseControllerManager {

    public _VC: any;

    private _controllers: any[];

    constructor(ViewControllers) {

        /**
         *
         * @type {Array}
         * @private
         */
        this._VC = ViewControllers;

        /**
         *
         * @type {Array}
         * @private
         */
        this._controllers = [];

    }

    /**
     *
     * @param ID
     * @param content
     */
    public add(ID = null, content) {

        if (typeof ID === 'string' && ID === 'null') {
            ID = null;
        }

        this._controllers.unshift(this.getController(ID, content));

    }

    public pop() {
        this._controllers.pop();
    }

    public shift() {
        this._controllers.shift();
    }

    /**
     *
     * @param type
     * @returns {*}
     */
    public use(type) {

        if ('prev' === type) {
            return this._controllers[1];
        }

        if ('current' === type) {
            return this._controllers[0];
        }

        return false;
    }

    /**
     *
     * @param ID
     * @param content
     */
    public getController(ID = null, content = null) {

        let controller = null;

        // if (ID !== null && (this._VC[ID] !== null && this._VC[ID] !== undefined)) {
        //     controller = new this._VC[ID](content);
        // } else if (content !== null && this.isSet(this._VC[content.attr('data-use-controller')])) {
        //     controller = new this._VC[content.attr('data-use-controller')](content);
        // } else if (content !== null && this.isSet(this._VC[content.attr('id')])) {
        //     controller = new this._VC[content.attr('id')](content);
        // } else {
        //     controller = new this._VC['default'](content);
        // }
        if (ID !== null && (this._VC[ID] !== null && this._VC[ID] !== undefined)) {
            controller = new this._VC[ID](content);
        } else if (content !== null && this._VC[content.attr('data-use-controller')]) {
            controller = new this._VC[content.attr('data-use-controller')](content);
        } else if (content !== null && this._VC[content.attr('id')]) {
            controller = new this._VC[content.attr('id')](content);
        } else {
            controller = new this._VC['default'](content);
        }

        return controller;
    }

}