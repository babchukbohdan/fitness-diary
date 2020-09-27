import React from 'react'
import { ReactComponent as DeleteExerciseIcon } from "../../../images/bin.svg";
export const DeleteBtn = ({onClickHandler, btnClasses, iconClasses}) => {
  return (
    <button className={btnClasses} onClick={onClickHandler}>
      <DeleteExerciseIcon className={iconClasses} name="remove button" />
      {/* Remove<br/>exercise */}
    </button>
  )
}
