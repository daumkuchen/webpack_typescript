import BaseControllerManager from './base/BaseControllerManager';

export default class ControllerManager extends BaseControllerManager {

    private router: any;
    private useAjax: boolean;

    constructor(ViewControllers, Router, useAjax) {

        super(ViewControllers);
        this.router = Router;
        this.useAjax = useAjax;

    }

    /**
     *
     * @param ID
     * @param content
     */
    public getController(ID = null, content = null) {

        let info = {
            id: null,
            path: location.pathname,
            notice_flag: false,
            secret_mode: false,
            useAjax: this.useAjax,
            sort: 0,
            parentId: null,
            textureId: null,
            locationName: null,
        };

        let path = location.pathname.split('/');
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] in this.router) {
                info.id = this.router[path[i]]['id'];
                info.textureId = this.router[path[i]]['texture_id'];
                info.parentId = this.router[path[i]]['parent_id'];
                info.sort = this.router[path[i]]['sort'];
                info.locationName = this.router[path[i]]['name'];
                info.notice_flag = Number(this.router[path[i]]['notice_flag']) !== 0;
                info.secret_mode = Number(this.router[path[i]]['secret_mode']) !== 0;
                break;
            }
        }

        let controller = null;
        // if (ID !== null && (this._VC[ID] !== null && this._VC[ID] !== undefined)) {
        //     controller = new this._VC[ID](content, info);
        // } else if (content !== null && isSet(this._VC[content.attr('data-use-controller')])) {
        //     controller = new this._VC[content.attr('data-use-controller')](content, info);
        // } else if (content !== null && isSet(this._VC[content.attr('id')])) {
        //     controller = new this._VC[content.attr('id')](content, info);
        // } else {
        //     controller = new this._VC['default'](content, info);
        // }
        if (ID !== null && (this._VC[ID] !== null && this._VC[ID] !== undefined)) {
            controller = new this._VC[ID](content, info);
        } else if (content !== null && this._VC[content.attr('data-use-controller')]) {
            controller = new this._VC[content.attr('data-use-controller')](content, info);
        } else if (content !== null && this._VC[content.attr('id')]) {
            controller = new this._VC[content.attr('id')](content, info);
        } else {
            controller = new this._VC['default'](content, info);
        }

        Object.defineProperty(controller, 'info', { value: info });

        return controller;
    }

}