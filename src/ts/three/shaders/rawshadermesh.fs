precision mediump float;
precision mediump int;

uniform float time;
uniform vec2 resolution;

uniform float color_r;
uniform float color_g;
uniform float color_b;
uniform float noise_range;

// varying vec2 vUv;
varying vec3 vNormal;

#pragma glslify: fbm = require("./glslify/noise/fbm/3d")

void main() {

	// vec2 uv = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
	// uv *= 5.;
	// uv *= noise_range;
	// float r = fbm(vec3(uv.x, uv.y, time * .5), 8) * color_r;
	// float g = fbm(vec3(uv.x, uv.y, time * .5), 8) * color_g;
	// float b = fbm(vec3(uv.x, uv.y, time * .5), 8) * color_b;

	vec3 tUv = vNormal;
	tUv *= 2.;
	tUv *= noise_range;
	float r = fbm(vec3(tUv.x, tUv.y, tUv.z + time * 2.), 8) * color_r;
	float g = fbm(vec3(tUv.x, tUv.y, tUv.z + time * 2.), 8) * color_g;
	float b = fbm(vec3(tUv.x, tUv.y, tUv.z + time * 2.), 8) * color_b;

	vec3 color = vec3(r, g, b);

	gl_FragColor = vec4(color, 1.);
	
}