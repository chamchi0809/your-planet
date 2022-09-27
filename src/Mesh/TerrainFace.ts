import { addVector, cross, divideByScalar, multiplyByScalar, negate, normalize, subtractVectors } from '../vector';
import { createNoise3D } from 'simplex-noise';
import Alea from 'alea';
import { ShapeGenerator } from './Noise/ShapeGenerator';


export class TerrainFace{

  resolution:number;
  vertices:number[][];
  points:number[];
  normals:number[][];
  verticeNormals:number[];
  localUp:number[];
  axisA:number[];
  axisB:number[];
  shapeGenerator:ShapeGenerator;

  noise3d:any;

  constructor(resolution:number, localUp:number[], shapeGenerator:ShapeGenerator){
    this.resolution = resolution;
    this.vertices=[];
    this.points=[];
    this.normals=[];
    this.verticeNormals=[];

    this.localUp = localUp;
    this.axisA = [localUp[1], localUp[2], localUp[0]];
    this.axisB = cross(localUp, this.axisA);

    this.shapeGenerator = shapeGenerator;
  }

  MakeVertices(){
    this.shapeGenerator.minmax.ClearValue();
    let triangles:number[] = [];
    this.normals = Array.from(Array(this.resolution*this.resolution), ()=>[0,0,0]);

    for(let y = 0; y < this.resolution; y++){
      for(let x = 0; x < this.resolution; x++){
        let i = x + y* this.resolution;
        let percent = divideByScalar([x,y],this.resolution-1);
        let pointOnUnitCube = addVector(
          addVector(
            this.localUp, 
            multiplyByScalar(this.axisA, (percent[0]-.5)*2)
          ),
          multiplyByScalar(this.axisB, (percent[1]-.5)*2)
        );
        let pointOnUnitSphere = normalize(pointOnUnitCube);
        //console.log(this.shapeGenerator.CalcPointOnPlanet(pointOnUnitSphere));
        this.vertices.push(this.shapeGenerator.CalcPointOnPlanet(pointOnUnitSphere));
        

        if(x != this.resolution-1 && y != this.resolution-1){
          triangles.push(i);
          triangles.push(i+this.resolution+1);
          triangles.push(i+this.resolution);
          triangles.push(i);
          triangles.push(i+1);
          triangles.push(i+this.resolution+1);
        }
      }
    }

    triangles.forEach((tri,i)=>{
      const vertices = this.vertices;
      this.points.push(...vertices[tri]);

      let triIndex = i % 3;

      if(triIndex == 0){
        let normal:number[] = this.computeFaceNormal(vertices[triangles[i]], vertices[triangles[i+1]], vertices[triangles[i+2]]);
        this.normals[triangles[i]] = addVector(this.normals[triangles[i]],normal);
        this.normals[triangles[i+1]] = addVector(this.normals[triangles[i+1]],normal);
        this.normals[triangles[i+2]] = addVector(this.normals[triangles[i+2]],normal);
      }
    })

    this.normals = this.normals.map(normal=>{
      return normalize(normal);
    })

    triangles.forEach(tri=>{
      this.verticeNormals.push(...this.normals[tri]);
    })
  }

  computeFaceNormal(p1:number[], p2:number[], p3:number[]){
    let a = subtractVectors(p3, p2);
    let b = subtractVectors(p1, p2);

    return normalize(cross(a,b));
  }
}