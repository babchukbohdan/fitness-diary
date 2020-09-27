import React from 'react'
import { PharmaItem } from './PharmaItem'

import './Pharmacology.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useState } from 'react'

export const Pharmacology = () => {
  const [count, setCount] = useState(3)
  const pharmacology = new Array(count).fill('')
  return (
    <div className="pharmacology">
      <h2>Pharmacology</h2>
        <TransitionGroup component="div">
          {
            pharmacology && pharmacology.map((item, index) =>
              <CSSTransition
                key={index}
                classNames={'fromUp'}
                timeout={400}
              >
                <PharmaItem />
              </CSSTransition>
            )
          }
        </TransitionGroup>

        <div className="details__addexercise">
          <button
            className='btn btn-big btn--border'
            onClick={() => setCount(count + 1)}
          >
            Add pharma
          </button>
        </div>
    </div>
  )
}
