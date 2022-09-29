import React, { useState } from 'react'


interface InputProps{
  colors:'primary'|'secondary'|'red'|'darkgray'|'lightgray'
}

function Input(props:InputProps&React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
    type={props.type}
    id={props.id}
    className={`Input-${props.colors}`}
    placeholder={props.placeholder}
    defaultValue={props.defaultValue}
    value={props.value}
    defaultChecked={props.defaultChecked}
    checked={props.checked}
    onChange={props.onChange}
    onMouseDown={props.onMouseDown}
    >{props.children}</input>
  )
}

export default Input