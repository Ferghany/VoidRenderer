#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;
    float d = length(uv);
    d = sin(d * 10.0 + u_time) / 10.0;
    d = abs(d);
    d = smoothstep(0.0, 0.05, d);
    // d = step(0.05, abs(d - 0.5));
    gl_FragColor = vec4(d, 1.0, d, 1.0);
}