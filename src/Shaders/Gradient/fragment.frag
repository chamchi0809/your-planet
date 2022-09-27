
precision mediump float;

uniform vec2 u_coords;
uniform vec3 u_startColor;
uniform vec3 u_endColor;

varying float v_x;

vec3 lerp(vec3 a, vec3 b, float t);
float inverseLerp(float A, float B, float T);

void main() {

  float st = inverseLerp(u_coords.x, u_coords.y, v_x);
  gl_FragColor = vec4(lerp(u_startColor, u_endColor, st),1);
  
}

float inverseLerp(float A, float B, float T){
  return (T - A)/(B - A);
}

vec3 lerp(vec3 a, vec3 b, float t){
  return a + (b-a)*t;
}