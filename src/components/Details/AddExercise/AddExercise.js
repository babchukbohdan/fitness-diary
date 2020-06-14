import React from 'react'
import { Icon } from '../../UI/Icon/Icon'

export const AddExercise = ({onClickHandler}) => {
  return (
    <div className="details__addexercise">
      <button
        onClick={onClickHandler}
        className="btn-big btn"
      >
        <Icon clazz="details__icon" name="add" path="add.svg" />
        Add exercise
      </button>
    </div>
  )
}
