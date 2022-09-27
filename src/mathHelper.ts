export const degToRad=(d:number)=>{
  return d * Math.PI / 180;
}

export const Clamp=(n:number, min:number, max:number)=>{
  return Math.min(Math.max(min, n), max);
}

export const Clamp01=(n:number)=>{
  return Clamp(n, 0, 1);
}

export const ClampAngle=(angle:number, min:number, max:number)=>{
    angle = angle % 360;
    if ((angle >= -360) && (angle <= 360)) {
        if (angle < -360) {
            angle += 360;
        }
        if (angle > 360) {
            angle -= 360;
        }        
    }
    return Clamp(angle, min, max);
}

export const Lerp=(a:number, b:number, t:number)=>{
  return a + (b-a) * t
}

export const InversedLerp=(a:number, b:number, t:number)=>{
  return (t-a) / (b-a)
}