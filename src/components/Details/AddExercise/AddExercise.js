import React from 'react'
import { ReactComponent as AddExerciseIcon } from "../../../images/add.svg";


export const AddExercise = ({onClickHandler}) => {
  return (
    <div className="details__addexercise">
      <button
        onClick={onClickHandler}
        className="btn-big btn"
      >
        <AddExerciseIcon className="details__icon icon" name="add" />
        Add exercise
      </button>
    </div>
  )
}
