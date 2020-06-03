import React from 'react'

export const Set = ({index, onRemove}) => {
  return (
    <div className="details__set">
      <div className="details__set__num">{index}</div>
      <div className="details__values">
        <div className="details__weight">
          <input
            className=""
            // value="100"
          />
          <span>kg</span>
        </div>
        <div className="details__reps">
          <input
            className=""
            // value="100"
            // onChange={console.log}
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
