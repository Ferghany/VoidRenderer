#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 pallete(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    for(float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = pow(length(uv), 0.5) * exp(-2.0 * length(uv0));
        vec3 col = pallete(length(uv0) + i * .5 + u_time * .5);

        d = abs(sin(d * 8.0 + u_time) / 8.0);
        d = pow(0.005 / d, 1.1);

    // d = smoothstep(0.0, 0.05, d);
    // d = step(0.05, abs(d - 0.5));
        finalColor += col * d;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}