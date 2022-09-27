import React, { useState } from 'react'


interface ButtonProps{
  variants:'primary'|'secondary'
}

function Button(props:ButtonProps&React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
    className={`Button ${props.variants}'}`}
    onClick={props.onClick}
    onMouseDown={props.onMouseDown}
    >{props.children}</button>
  )
}

export default Button