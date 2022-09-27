export const cross=(a:number[], b:number[])=>{
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

export const subtractVectors=(a:number[], b:number[])=> {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export const normalize=(v:number[])=>{
  var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  // 0으로 나뉘지 않도록 하기
  if (length > 0.00001) {
    return [v[0] / length, v[1] / length, v[2] / length];
  } else {
    return [0, 0, 0];
  }
}

export const divideByScalar=(vec:number[], scalar:number)=>{
  return vec.map(el=>el/scalar);
}

export const multiplyByScalar=(vec:number[], scalar:number)=>{
  return vec.map(el=>el*scalar);
}

export const addVector=(a:number[], b:number[])=>{
  return a.map((el,i)=>{
    return i < b.length ? el+b[i] : el;
  })
}

export const negate=(vec:number[])=>[-vec[0],-vec[1],-vec[2]]

export type Vec3 = [number, number, number];