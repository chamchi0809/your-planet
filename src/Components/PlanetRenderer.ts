import m4 from '../Utils/m4';
import { degToRad } from '../mathHelper';
import { ShapeGenerator } from '../Mesh/Noise/ShapeGenerator';
import { createProgram, createShader } from '../Shaders/ShaderLoader';
import { normalize } from '../vector';

import front from '../Assets/front.png';
import back from '../Assets/back.png';
import right from '../Assets/right.png';
import left from '../Assets/left.png';
import top from '../Assets/top.png';
import bot from '../Assets/bot.png';


export class PlanetRenderer{

  gl:WebGLRenderingContext;
  program:WebGLProgram;
  vertexShader:WebGLShader;
  fragmentShader:WebGLShader;

  positionLoc:number;
  positionBuffer:WebGLBuffer[]=[];
  normalLoc:number;
  normalBuffer:WebGLBuffer[]=[];
  vertices:number[]=[];

  matrixLoc:WebGLUniformLocation;
  universialLightLoc:WebGLUniformLocation;
  lightLoc:WebGLUniformLocation;
  minmaxLoc:WebGLUniformLocation;

  textureLoc:WebGLUniformLocation;
  texture:WebGLTexture;

  skyVertexShader:WebGLShader;
  skyFragmentShader:WebGLShader;
  skyProgram:WebGLProgram;

  skyPositionLoc:number;
  skyPositionBuffer:WebGLBuffer;
  skyboxLoc:WebGLUniformLocation;
  skyboxTexture:WebGLTexture;
  skyMatrixLoc:WebGLUniformLocation;


  initGL(canvas:HTMLCanvasElement){
    this.gl = canvas.getContext('webgl');

    if(!this.gl){
      alert("webgl을 지원하지 않아요!");
    }
  }

  initScene(vertex:string, fragment:string, skyVertex:string, skyFragment:string){
    const gl = this.gl;

    this.vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
    this.fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);
    this.program = createProgram(gl, this.vertexShader, this.fragmentShader);

    this.skyVertexShader = createShader(gl, gl.VERTEX_SHADER, skyVertex);
    this.skyFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, skyFragment);
    this.skyProgram = createProgram(gl, this.skyVertexShader, this.skyFragmentShader);

    const {skyProgram,program} = this;

    this.positionLoc = gl.getAttribLocation(program, 'a_position');
    this.normalLoc = gl.getAttribLocation(program, 'a_normal');
    this.matrixLoc = gl.getUniformLocation(program, 'u_matrix');
    this.universialLightLoc = gl.getUniformLocation(program, 'u_universialLight');
    this.lightLoc = gl.getUniformLocation(program, 'u_reverseLightDir');
    this.minmaxLoc = gl.getUniformLocation(program, 'u_minmax');
    this.textureLoc = gl.getUniformLocation(program, 'u_texture');
    this.texture = gl.createTexture();

    this.skyPositionLoc = gl.getAttribLocation(skyProgram, 'a_position');
    this.skyMatrixLoc = gl.getUniformLocation(skyProgram, 'u_matrix');
    this.skyboxLoc =gl.getUniformLocation(skyProgram, 'u_skybox');
    this.skyboxTexture = gl.createTexture();

    this.skyPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.skyPositionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ]), gl.STATIC_DRAW);

    this.setSkyboxTexture();

    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
  }

  clearScene(){
    const gl = this.gl;
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  pushMesh(points:number[], normals:number[]){
    const {gl,program} = this;
    
    const pBuff = gl.createBuffer();
    const nBuff = gl.createBuffer();
    this.positionBuffer.push(pBuff);
    this.normalBuffer.push(nBuff);
    this.vertices.push(points.length/3);

    gl.bindBuffer(gl.ARRAY_BUFFER, pBuff);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(points),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuff);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(normals),
      gl.STATIC_DRAW
    )
  }

  drawMeshes(){

    const {gl} = this;
    
    for(let i = 0; i < this.positionBuffer.length; i++){
      gl.enableVertexAttribArray(this.positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer[i]);
      gl.vertexAttribPointer(this.positionLoc, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(this.normalLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer[i]);
      gl.vertexAttribPointer(this.normalLoc, 3, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, this.vertices[i]);
    }
  }

  drawSkybox(){
    const {gl} = this;

    gl.enableVertexAttribArray(this.skyPositionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.skyPositionBuffer);
    gl.vertexAttribPointer(this.skyPositionLoc, 2, gl.FLOAT, false, 0, 0);
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  renderScene(rotationX:number, rotationY:number, rotationZ:number, dst:number,shapeGenerator:ShapeGenerator){

    const yaw = degToRad(rotationY);
    const pitch = degToRad(rotationX);
    const roll = degToRad(rotationZ);

    const {gl,program,skyProgram} = this;

    // 행렬 계산
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let projMatrix = m4.perspective(degToRad(60),aspect, 1,2000);

    let cameraMatrix = m4.rotation(pitch, yaw, roll);
    cameraMatrix = m4.translate(cameraMatrix,0, 0, dst);
    const viewMatrix = m4.inverse(cameraMatrix);
    
    const viewProjMatrix = m4.multiply(projMatrix,viewMatrix);

    let skyMatrix = m4.inverse(m4.lookAt(
      [-Math.sin(yaw)*Math.cos(pitch),
        -Math.sin(pitch), 
         -Math.cos(yaw) * Math.cos(pitch)]
      , [0,0,0], [0,1,0]));
    skyMatrix[12] = 0;
    skyMatrix[13] = 0;
    skyMatrix[14] = 0;

    skyMatrix = m4.multiply(projMatrix, skyMatrix);
    skyMatrix = m4.inverse(skyMatrix);

    gl.useProgram(skyProgram);

    gl.uniformMatrix4fv(this.skyMatrixLoc, false, skyMatrix);
    gl.uniform1i(this.skyboxLoc, 0);

    this.drawSkybox();

    gl.useProgram(program);
    
    // 행렬 설정
    gl.uniformMatrix4fv(this.matrixLoc, false, viewProjMatrix);
    gl.uniform1f(this.universialLightLoc,0);
    gl.uniform3fv(this.lightLoc, normalize([0.5, 0.7, 1]))

    const min = shapeGenerator.minmax.min;
    const max = shapeGenerator.minmax.max;
    gl.uniform2f(this.minmaxLoc, min, max);
    gl.uniform1i(this.textureLoc, 0);

    this.drawMeshes();
  }

  clearMeshes(){
    this.positionBuffer=[];
    this.normalBuffer=[];
    this.vertices=[];
  }

  setPlanetTexture(src:string){
    
    let image = new Image();
    image.src = src;

    image.onload=()=>{
      const {gl,texture} = this;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
    }
  }

  setSkyboxTexture(){
    const {gl} =this;

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.skyboxTexture);

    const faceInfos = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: right,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: left,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: top,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: bot,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: front,
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: back,
      },
    ];
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    faceInfos.forEach((faceInfo) => {
      const {target, url} = faceInfo;

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 512;
      const height = 512;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;

      // setup each face so it's immediately renderable
      gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

      // Asynchronously load an image
      const image = new Image();
      image.crossOrigin='anonymous';
      image.src = url;
      image.onload=()=>{
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.skyboxTexture);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        
      }
    });
  }
}