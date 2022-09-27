import React, { useRef, useState, VoidFunctionComponent } from 'react'
import { InversedLerp } from '../mathHelper';
import { Vec3 } from '../vector';
import { IGradientKey } from './GradientRenderer'

interface GradientKeyProps{
  keyInfo:IGradientKey
  dragged:boolean
  selected:boolean
  setColor:(color:Vec3)=>void
  setDragged:(dragged:boolean)=>void
  setSelected:(selected:boolean)=>void
  left:number
  right:number
}

function GradientKey(props:GradientKeyProps) {

  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`gradientKey ${props.dragged && 'dragged'} ${props.selected && 'selected'}`} 
    style={{left:`${props.keyInfo.pos * 100}%`}} 
    onMouseDown={()=>props.setDragged(true)}
    onClick={(e)=>{
      e.stopPropagation();
      props.setSelected(true);
      colorInputRef.current.click();
    }}
    >
      <input type="color" ref={colorInputRef} value={ConvertRGBtoHex(props.keyInfo.color)} onChange={(e)=>props.setColor(HexToColor(e.target.value))} style={{display:'none'}}/>
    </div>
  )
}

function ColorToHex(color:number) {
  let hexadecimal = (color*255).toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function ConvertRGBtoHex(color:Vec3) {
  return "#" + ColorToHex(color[0]) + ColorToHex(color[1]) + ColorToHex(color[2]);
}

function HexToColor(hex:string):Vec3{
  const hexArr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  hexArr.shift();
  //@ts-ignore
  const color:Vec3 = hexArr.map(hex=>{
    
    return parseInt(hex, 16) / 255;
  })
  return color;
}

export default GradientKey