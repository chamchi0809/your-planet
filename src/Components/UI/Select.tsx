import React, { useState } from 'react'


interface SelectProps{
  colors:'primary'|'secondary'|'red'|'darkgray'|'lightgray'
}

function Select(props:SelectProps&React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
    className={`Input-${props.colors}`}
    placeholder={props.placeholder}
    defaultValue={props.defaultValue}
    value={props.value}
    onChange={props.onChange}
    onMouseDown={props.onMouseDown}
    >{props.children}</select>
  )
}

export default Select