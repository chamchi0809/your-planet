import m4 from '../Utils/m4';
import { degToRad, Lerp } from '../mathHelper';
import { createProgram, createShader } from '../Shaders/ShaderLoader';
import { Vec3 } from '../vector';


export class GradientRenderer{

  static instance:GradientRenderer;

  gl:WebGLRenderingContext;
  program:WebGLProgram;
  vertexShader:WebGLShader;
  fragmentShader:WebGLShader;

  positionLoc:number;
  positionBuffer:WebGLBuffer[]=[];

  colorsLoc:WebGLUniformLocation[]=[];
  
  coordsLoc:WebGLUniformLocation;
  coords:number[][];
  colors:number[][][];

  static getGradientRenderer(){
    if(!GradientRenderer.instance) GradientRenderer.instance = new GradientRenderer();
    return GradientRenderer.instance;
  }

  initGL(canvas:HTMLCanvasElement){
    this.gl = canvas.getContext('webgl');

    if(!this.gl){
      alert("webgl을 지원하지 않아요!");
    }
  }

  initScene(vertex:string, fragment:string){
    const gl = this.gl;
    this.vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
    this.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

    this.program = createProgram(gl, this.vertexShader, this.fragmentShader);

    const program = this.program;

    this.positionLoc = gl.getAttribLocation(program, 'a_position');

    this.colorsLoc.push(gl.getUniformLocation(program,'u_startColor'));
    this.colorsLoc.push(gl.getUniformLocation(program,'u_endColor'));
    this.coordsLoc = gl.getUniformLocation(program, 'u_coords');

    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
  }

  clearScene(){
    const gl = this.gl;
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  makePlane(keys:IGradientKey[]){
    const {gl,program} = this;
    this.positionBuffer = [];
    this.coords=[];
    this.colors=[];

    const sortedKeys = keys.sort((a,b)=>{
      return a.pos - b.pos
    });

    if(sortedKeys[0].pos != 0){
      sortedKeys.splice(0, 0, {pos:0, color:sortedKeys[0].color});
    }
    if(sortedKeys[sortedKeys.length-1].pos != 1){
      sortedKeys.push({pos:1, color:sortedKeys[sortedKeys.length-1].color})
    }

    sortedKeys.map(key=>{
      return {pos: Lerp(-1, 1, key.pos), color:key.color};
    }).forEach((key,i,arr)=>{
      if(i == arr.length-1){
        return;
      }
      let start = key.pos;
      let end = arr[i+1].pos;

      const pBuff = gl.createBuffer();
      this.positionBuffer.push(pBuff);
      this.coords.push([start, end]);
      this.colors.push([key.color, arr[i+1].color]);

      gl.bindBuffer(gl.ARRAY_BUFFER, pBuff);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
          [
            start, 1,
            end, 1,
            start, -1,
            start, -1,
            end, 1,
            end, -1
          ]
        ),
        gl.STATIC_DRAW
      );
    });

  }

  renderPlane(){

    const {gl} = this;
    for(let i = 0; i < this.positionBuffer.length; i++){
      gl.enableVertexAttribArray(this.positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer[i]);
      gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2fv(this.coordsLoc, this.coords[i]);
      gl.uniform3fv(this.colorsLoc[0],this.colors[i][0]);
      gl.uniform3fv(this.colorsLoc[1],this.colors[i][1]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }

  renderScene(){

    const {gl,program} = this;

    gl.useProgram(program);

    this.renderPlane();
  }
}

export interface IGradientKey{
  pos:number,
  color:Vec3,
}