import { Button } from '@/types/types'
import React from 'react'

const Button = ({ text, handleClick }: Button) => {
  return (
    <button className="cta" onClick={handleClick}>
      <span>{text}</span>
      <svg viewBox="0 0 13 10" height="10px" width="15px">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  )
}

export default Button