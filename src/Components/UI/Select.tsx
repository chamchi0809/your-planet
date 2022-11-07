import React, { useState, FC } from 'react'


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
  colors:'primary'|'secondary'|'red'|'darkgray'|'lightgray'
}

const Select:React.FC<SelectProps> = ({...props})=>{
  return (
    <select
    className={`Input-${props.colors}`}
    {...props}
    >{props.children}</select>
  )
}

export default Select