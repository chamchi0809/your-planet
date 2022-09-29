import React, { useState } from 'react'


interface ButtonProps{
  colors:'primary'|'secondary'|'red'|'darkgray'|'lightgray'
  
}

function Button(props:ButtonProps&React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
    className={`Button-${props.colors}`}
    onClick={props.onClick}
    onMouseDown={props.onMouseDown}
    ><div className="children">{props.children}</div></button>
  )
}

export default Button