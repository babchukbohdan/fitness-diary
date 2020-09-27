import React, { useContext } from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { Set } from '../Set/Set'
import { TodayContext } from '../../../context/today/todayContext'
import { ReactComponent as AddSetIcon } from "../../../images/copy.svg";
import { ReactComponent as DeleteExerciseIcon } from "../../../images/bin.svg";

import './Exercise.scss'
import { DeleteBtn } from '../../UI/DeleteBtn/DeleteBtn';

export const Exercise = ({exercise}) => {

  // const sets = new Array(5).fill('')
  const {sets, id, name} = exercise
  const {removeExercise, addSet} = useContext(TodayContext)

  return (
    <div className="exercise">

      <p className="exercise__name">
        {name.name}
      </p>


      <div className="exercise__container">

        <TransitionGroup
          component="div"
          className="exercise__sets"
        >
          {
            sets.map((set, i) => (

              <CSSTransition
                key={set.id}
                classNames={'set__animate'}
                timeout={500}
              >
                <Set
                  weight={set.weight}
                  reps={set.reps}
                  index={i}

                  id={set.id}
                  exerciseId={id}
                />
              </CSSTransition>

            ))
          }
        </TransitionGroup>

        <div className="exercise__addset">
          <button className="btn" onClick={() => addSet(id)}>
            <AddSetIcon className="exercise__addset icon" name="add set" />
            {/* Add<br/>set */}
          </button>
        </div>

      </div>

      <div className="exercise__close">
        <DeleteBtn
          onClickHandler={() => removeExercise(id)}
          btnClasses='btn'
          iconClasses="exercise__close icon"
        />
      </div>

    </div>
  )
}
