precision mediump float;
precision mediump int;

uniform float time;
uniform float alpha;
uniform float dpr;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D texture;

varying vec2 vUv;

void main() {

    vec4 tex = texture2D(texture, vUv);
    vec4 dest = vec4(tex.rgb, tex.a);
    gl_FragColor = dest;

}