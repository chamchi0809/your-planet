
attribute vec4 a_position;
attribute vec3 a_normal;

uniform mat4 u_matrix;

varying vec3 v_position;
varying vec3 v_normal;

void main() {

  vec4 position = u_matrix * a_position;
  
  gl_Position = position;

  v_normal = a_normal;
  v_position = a_position.xyz;
}