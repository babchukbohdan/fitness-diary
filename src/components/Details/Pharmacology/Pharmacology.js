import React from 'react'
import { PharmaItem } from './PharmaItem'

import './Pharmacology.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useState } from 'react'
import { useFirebaseContext } from '../../../context/firebase/firebaseContext'
import { useTodayContext } from '../../../context/today/todayContext'
import { Note } from '../Note/Note'
import { Submit } from '../Submit/Submit'

export const Pharmacology = () => {
  const [count, setCount] = useState(3)

  const {addTrainingDay, postingData} = useFirebaseContext()

  const {state, addPharma, removePharma, changePharma, changeValue} = useTodayContext()
  console.log(state, 'PHARMA')
  const {medications, note} = state.pharmacology

  return (
    <div className="pharmacology">
      <h2 className="title pharmacology__title">Pharmacology</h2>
        <TransitionGroup component="div">
          {
            medications && medications.map((item, index) =>
              <CSSTransition
                key={item.id}
                classNames={'fromUp'}
                timeout={400}
              >
                <PharmaItem
                  index={index}
                  item={item}
                  removeItem={removePharma}
                  changePharma={changePharma}
                />
              </CSSTransition>
            )
          }
        </TransitionGroup>

        <div className="details__addexercise">
          <button
            className='btn btn--big btn--border btn--outlined btn--hovered'
            onClick={() => addPharma()}
          >
            Add pharma
          </button>
        </div>
        <Note path='pharmacology.note' value={note} changeValue={changeValue} />
        <Submit btnText="Save" value={state} postData={addTrainingDay} loading={postingData} />
    </div>
  )
}
