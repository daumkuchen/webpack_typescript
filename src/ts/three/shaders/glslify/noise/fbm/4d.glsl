#pragma glslify: snoise = require("./../simplex/4d")

float fbm(vec4 x, const in int it) {
    float v = 0.0;
    float a = 0.5;
    vec4 shift = vec4(100);
    
    for (int i = 0; i < 32; ++i) {
        if(i<it) {
            v += a * snoise(x);
            x = x * 2.0 + shift;
            a *= 0.5;
        }
    }
    return v;
}

#pragma glslify: export(fbm)