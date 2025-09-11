#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 uv, vec2 p, float r, float blur) {
  float d = length(uv - p);
  float c = smoothstep(r, r - blur, d);

  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;
  // vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;

  float mask = circle(uv, vec2(0.0, 0.0), .4, 0.05);
  mask -= circle(uv, vec2(-.15, 0.16), .075, 0.01);
  mask -= circle(uv, vec2(.12, 0.16), .075, 0.01);
  mask -= circle(uv, vec2(.0, 0.0), .015, 0.01);

  float mouth = circle(uv, vec2(0.0, -0.075), .045, 0.01);
  mouth -= circle(uv, vec2(0.0, -0.05), .05, 0.01);
  // vec3 col = vec3(mouth);
  mouth = step(0.5, mouth);
  mask -= mouth;
  vec3 col = vec3(1.0, 0.3686, 0.0) * mask;

  gl_FragColor = vec4(col, 1.0);
}

// float circleHard(vec2 uv, vec2 p, float r) {
//   return step(length(uv - p), r);
// }

// float mouth = circleHard(uv, vec2(0.0, 0.0), .05);
// mouth -= circleHard(uv, vec2(0.0, 0.025), .05);
// mask -= mouth;