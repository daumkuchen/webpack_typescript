import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer, WebGLRenderTarget,
    NearestFilter, ClampToEdgeWrapping,
} from 'three';

import RawShaderMesh from './modules/RawShaderMesh';
import Fx from './modules/Fx';

import * as dat from 'dat.gui';
import Stats from './vendors/Stats.js';
const OrbitControls = require('three-orbitcontrols');

export default class Stage {

    private _rendering: boolean;

    private _camera: any;

    private _scene: any;

    private _renderer: any;

    private _renderer_target_elm: any;

    private _renderer_target: any;

    private controls: any;
    
    private _cnt: number;

    private _speed: number;

    private _mouse: any;

    private _mouse_pos: any;

    private _mouse_ratio: any;

    private raw_shader_mesh: any;

    private fx: any;

    private stats: any;

    private dat: any;

    private window_inner_width: number;
    private window_Inner_height: number;
    private SWITCH_WIDTH: number;
    private dpr: number;

    private stage: any;
    
    constructor() {
        
        this._rendering = true;

        this._camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

        this._scene = {
            base: new Scene(),
            fx: new Scene(),
        };

        this._renderer = new WebGLRenderer( {
            antialias: true,
            alpha: true
        });

        this._renderer_target_elm = new WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight,
            {
                magFilter: NearestFilter,
                minFilter: NearestFilter,
                wrapS: ClampToEdgeWrapping,
                wrapT: ClampToEdgeWrapping,
            }
        );

        this._renderer_target = {
            base: this._renderer_target_elm.clone(),
        }

        this.controls = null;
        
        this._cnt = 0;

        this._speed = 1;

        this._mouse = {
            x: 0,
            y: 0
        };

        this._mouse_pos = {
            x: 0,
            y: 0
        };

        this._mouse_ratio = {
            x: .1,
            y: .1
        };

        this.raw_shader_mesh = new RawShaderMesh();

        this.fx = new Fx(this._renderer_target.base.texture);

        this.stats = new Stats();

        this.dat = new dat.GUI();

        this.window_inner_width = window.innerWidth;
        this.window_Inner_height = window.innerHeight;
        this.SWITCH_WIDTH = 768;
        this.dpr = window.devicePixelRatio || 1;

        this.stage = document.getElementById('stage');

    }

    public setup() {

        this._camera.position.z = 2;
        // this._camera.lookAt(0, 0, 0);

        this._renderer.setClearColor(0x000000, 0.);
        this._renderer.setPixelRatio(window.devicePixelRatio || 1);

        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer_target.base.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);

        this.controls = new OrbitControls(this._camera, this._renderer.domElement);

        this.raw_shader_mesh.setup();
        this._scene.base.add(this.raw_shader_mesh.mesh);

        this.fx.setup();
        this._scene.fx.add(this.fx.mesh);

        this.stage.appendChild(this._renderer.domElement);

        window.addEventListener('resize', this.resize.bind(this));

        this.stage.addEventListener('mousemove', e => {
            this._mouse = {
                x: (2 * e.clientX - window.innerWidth) / window.innerWidth,
                y: (-1 * (2 * e.clientY - window.innerHeight) / window.innerHeight)
            };
        });

        this.stats.setup();
        this.datSetup();

    }

    public update() {

        this._cnt += this._speed;
        // this._cnt = this._cnt % 360;

        this._mouse_pos.x += (this._mouse.x - this._mouse_pos.x) * this._mouse_ratio.x;
        this._mouse_pos.y += (this._mouse.y - this._mouse_pos.y) * this._mouse_ratio.y;

        this.raw_shader_mesh.update(this._cnt);
        this.fx.update(this._cnt);

        this.raw_shader_mesh.mouseMoved(this._mouse_pos.x, this._mouse_pos.y);

        this.stats.update();

    }

    public render() {

        this.update();

        this._renderer.render(this._scene.base, this._camera, this._renderer_target.base);
        this._renderer.render(this._scene.fx, this._camera);

        window.addEventListener('keydown', (e) => {
            this._rendering = e.keyCode !== 27;
        }, false);
        if (this._rendering) requestAnimationFrame(this.render.bind(this));

    }

    public resize() {

        this.window_inner_width = window.innerWidth;
        this.window_Inner_height = window.innerHeight;

        this._camera.aspect = this.window_inner_width / this.window_Inner_height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(this.window_inner_width, this.window_Inner_height);
        this._renderer_target.base.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);

        this.raw_shader_mesh.resize(this.window_inner_width, this.window_Inner_height);

    }

    public scroll(st) {
    }

    public destroy() {
    }

    private datSetup() {
        
        /**
         *
         * @type {color}
         */
        let color = {
            controls: new function() {
                this.R = 1;
                this.G = 1;
                this.B = 1;
            },
            folder: this.dat.addFolder('color')
        }

        color.folder.add(color.controls, 'R', 0, 1, 0.01).onChange((value) => {
            this.raw_shader_mesh.uniforms.color_r.value = value;
        });

        color.folder.add(color.controls, 'G', 0, 1, 0.01).onChange((value) => {
            this.raw_shader_mesh.uniforms.color_g.value = value;
        });

        color.folder.add(color.controls, 'B', 0, 1, 0.01).onChange((value) => {
            this.raw_shader_mesh.uniforms.color_b.value = value;
        });

        color.folder.open();

        /**
         *
         * @type {noise}
         */
        let noise = {
            controls: new function() {
                this.range = 1;
            },
            folder: this.dat.addFolder('noise')
        }

        noise.folder.add(noise.controls, 'range', 1, 10, 0.01).onChange((value) => {
            this.raw_shader_mesh.uniforms.noise_range.value = value;
        });

        noise.folder.open();

    }

}

// @ts-ignore
window.Stage = Stage;