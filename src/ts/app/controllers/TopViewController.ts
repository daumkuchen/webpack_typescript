import ViewController from './ViewController';

import { TweenLite } from 'gsap';
import Utility from '../../utility/Utility';

export default class TopViewController extends ViewController {

    public stage: any;

    constructor(content) {

        super(content);

        this.stage = null;

    }

    viewWillLoad() {

        super.viewWillLoad();

        // @ts-ignore
        this.stage = new window.Stage();
        this.stage.setup();
        this.stage.render();

    }

    viewDidLoad() {

        super.viewDidLoad();

    }

    viewWillAppear() {

        super.viewWillAppear();

    }

    viewDidAppear() {

        super.viewDidAppear();

    }

    viewWillDisappear() {

        super.viewWillDisappear();

    }

    viewDidDisappear() {

        super.viewDidDisappear();

    }

    resize() {

        super.resize();

    }

    // scroll(st) {
    //     super.scroll();
    // }

}