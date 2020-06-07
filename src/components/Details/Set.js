import React, { useState } from 'react'

export const Set = ({index, onRemove}) => {
  const [weight, setWeight] = useState(0)
  const [reps, setReps] = useState(0)
  return (
    <div className="details__set">
      <div className="details__set__num">{index + 1}</div>
      <div className="details__values">
        <div className="details__weight">
          <input
            className=""
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value)
            }}
          />
          <span>kg</span>
        </div>
        <div className="details__reps">
          <input
            className=""
            value={reps}
            title='select'
            onChange={(e) => {
              setReps(e.target.value)
            }}
          />
          <span>reps</span>
        </div>
      </div>
      <div className="details__set__remove">
        <button
          className="details__set__btn"
          onClick={onRemove}
        >&times;</button>
      </div>
    </div>
  )
}
