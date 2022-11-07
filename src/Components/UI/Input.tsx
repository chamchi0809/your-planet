import React, { useState } from 'react'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  colors:'primary'|'secondary'|'red'|'darkgray'|'lightgray'
}

const Input:React.FC<InputProps>=({...props})=>{
  return (
    <input
    className={`Input-${props.colors}`}
    {...props}
    >{props.children}</input>
  )
}

export default Input