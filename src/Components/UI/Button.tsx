import React, { useState } from 'react'


interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  colors:'primary'|'secondary'|'red'|'darkgray'|'lightgray'
  
}

const Button:React.FC<ButtonProps>=({...props})=>{
  return (
    <button
    className={`Button-${props.colors}`}
    {...props}
    ><div className="children">{props.children}</div></button>
  )
}

export default Button