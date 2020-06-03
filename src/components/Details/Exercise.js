import React from 'react'
import { Set } from './Set'

export const Exercise = () => {
  const sets = new Array(5).fill('')
  return (
    <div className="details__exercise">

      <select name="">
        <option value="exercise01">exercise01</option>
        <option value="exercise02">exercise02</option>
        <option value="exercise03">exercise03</option>
        <option value="exercise04">exercise04</option>
        <option value="exercise05">exercise05</option>
      </select>


      <div className="details__sets">
        {
          sets.map((set) => <Set/>)
        }
      </div>

      <div className="details__addset">
        <button>+</button>
      </div>

      <div className="details__close">
        <button>&times;</button>
      </div>

    </div>
  )
}
