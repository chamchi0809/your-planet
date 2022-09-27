// attribute는 buffer에서 데이터를 받음
attribute vec2 a_position;

varying float v_x;

// 모든 셰이더는 main 함수를 가짐
void main() {

  
  gl_Position = vec4(a_position.xy,0,1);
  v_x = a_position.x;
}