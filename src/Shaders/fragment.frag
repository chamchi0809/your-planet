
precision mediump float;
uniform vec3 u_reverseLightDir;
uniform float u_universialLight;
uniform vec2 u_minmax;

varying vec3 v_position;
varying vec3 v_normal;

uniform sampler2D u_texture;

float inverseLerp(float A, float B, float T);

void main() {

  vec3 normal = normalize(v_normal);
  float light = dot(u_reverseLightDir, normal);  
  light = (light + 1.0) / 2.0;

  light += u_universialLight;

  vec2 texcoord = vec2(inverseLerp(u_minmax.r,u_minmax.g,length(v_position)));
  
  vec4 texColor = texture2D(u_texture, texcoord);
  gl_FragColor = texColor;
  gl_FragColor.rgb *= light;
  
}

float inverseLerp(float A, float B, float T){
  return (T - A)/(B - A);
}