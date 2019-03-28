import {
    PlaneBufferGeometry,
    RawShaderMaterial,
    Mesh,
    Math as _Math,
    Vector2,
    DoubleSide
} from 'three';

const vertexShader = require('../shaders/fx.vs');
const fragmentShader = require('../shaders/fx.fs');

export default class Fx {

    public uniforms: any;

    public geometry: any;

    public material: any;

    public mesh: any;

    constructor(texture: any) {

        this.uniforms = {
            time: {
                type: 'f',
                value: 0.
            },
            resolution: {
                type: 'v2',
                value: new Vector2()
            },
            alpha: {
                type: 'f',
                value: 1,
            },
            dpr: {
                type: 'f',
                value: window.devicePixelRatio || 1
            },
            texture: {
                type: 't',
                value: texture || null
            },
        };

        this.geometry = null;

        this.material = null;

        this.mesh = null;

    }

    public setup() {

        this.geometry = new PlaneBufferGeometry(2, 2);

        this.material = new RawShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            transparent: true,
            side: DoubleSide,
        });

        this.mesh = new Mesh(this.geometry, this.material);
    
        // this.mesh.material.dispose();
        // this.mesh.geometry.dispose();
        
        this.uniforms.resolution.value.x = window.innerWidth;
        this.uniforms.resolution.value.y = window.innerHeight;

    }

    public update(cnt: number) {

        this.uniforms.time.value = _Math.degToRad(cnt);

    }

    public resize(width: number, height: number) {

        this.uniforms.resolution.value.x = width;
        this.uniforms.resolution.value.y = height;

    }

    public mouseMoved(x: number, y: number) {

        this.mesh.position.x = x * .1;
        this.mesh.position.y = y * .1;

    }

}