export default class ViewController {

    public SWITCH_WIDTH: number;
    public window_inner_width: number;
    public window_inner_height: number;

    constructor(content) {
        
        this.SWITCH_WIDTH = 768;
        this.window_inner_width = window.innerWidth;
        this.window_inner_height = window.innerHeight;

    }

    viewWillLoad() {}

    viewDidLoad() {}

    viewWillAppear() {}

    viewDidAppear() {}

    viewWillDisappear() {}

    viewDidDisappear() {}

    resize() {

        this.window_inner_width = window.innerWidth;
        this.window_inner_height = window.innerHeight;

    }

    // scroll(st) {
    //     // this.uIHeader.scroll(st);
    // }

}