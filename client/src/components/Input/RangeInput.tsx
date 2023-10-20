'use client'
import React, { useState } from 'react'
import './RangeInput.scss'

interface RangeInputProps {
  min: number
  max: number
  onRangeChange: (value: number) => void
}

const RangeInput: React.FC<RangeInputProps> = (props) => {
  const [value, setValue] = useState(5)

  const handleChange = (e: { target: { value: string } }) => {
    const newValue = parseInt(e.target.value, 10)
    setValue(newValue)
    props.onRangeChange(newValue)
  }

  return (
    <div className="alignement-range-bar">
      <div> {props.min} </div>
      <input
        className="range-bar"
        type="range"
        min={props.min}
        max={props.max}
        value={value}
        onChange={handleChange}
      />
      <div> {props.max} </div>
    </div>
  )
}

export default RangeInput
