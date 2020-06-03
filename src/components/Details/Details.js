import React from 'react'
import './Details.scss'
import { Exercise } from './Exercise'

export const Details = () => {
  const exersices = new Array(5).fill('')
  return (
    <div className="details">
      <div className="details__header">
        <ul className="details__list">
          <li className="details__info">Date: 19.05.2020</li>
          <li className="details__info">Weight: 70kg</li>
          <li className="details__info">Sleep: 9 hours</li>
        </ul>
      </div>

      <div className="details__exercises">
        {exersices.map((item) => <Exercise />)}

        <div className="details__addexercise">
          <button>+</button>
        </div>

      </div>

      <div className="details__note">
          <textarea></textarea>
      </div>

      <div className="details__save">
        <button>Save</button>
      </div>

        <div className="details__footer">
          <ul className="details__list">
            <li className="details__info">Start: 17:00</li>
            <li className="details__info">End: 18:30</li>
            <li className="details__info">Duration: 90min</li>
          </ul>
        </div>

    </div>
  )
}
