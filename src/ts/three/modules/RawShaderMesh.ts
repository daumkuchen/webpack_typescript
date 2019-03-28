import {
    PlaneBufferGeometry, SphereBufferGeometry,
    RawShaderMaterial,
    Mesh, Math as _Math,
    Vector2,
    DoubleSide
} from 'three';

const vertexShader = require('../shaders/rawshadermesh.vs');
const fragmentShader = require('../shaders/rawshadermesh.fs');

export default class RawShaderMesh {

    public uniforms: any;

    public geometry: any;

    public material: any;

    public mesh: any;

    constructor() {

        this.uniforms = {
            time: {
                type: 'f',
                value: 0.
            },
            resolution: {
                type: 'v2',
                value: new Vector2()
            },
            color_r: {
                type: 'f',
                value: 1,
            },
            color_g: {
                type: 'f',
                value: 1,
            },
            color_b: {
                type: 'f',
                value: 1,
            },
            noise_range: {
                type: 'f',
                value: 1,
            },
        };

        this.geometry = null;

        this.material = null;

        this.mesh = null;

    }

    public setup() {

        // this.geometry = new PlaneBufferGeometry(1, 1, 1);
        this.geometry = new SphereBufferGeometry(.65, 64, 64);

        this.material = new RawShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            side: DoubleSide,
        });

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.material.dispose();
        this.mesh.geometry.dispose();
        
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