import React from 'react'
import { DeleteBtn } from '../../UI/DeleteBtn/DeleteBtn'

export const PharmaItem = () => {
  return (
    <div className="exercise">
      <div className="pharmacology__container">
        <label
          // htmlFor={item.id}
          className='pharmacology__label'
        ><span className="label-text">Pharma #</span>
        <input
          name="name"
          // id={item.id}
          // onChange={inputHandler}
          // value={name}
          type="text"
          className="input input--bd-radius--small pharmacology__input"
          autoComplete={false}
        />
        </label>
        <label
          // htmlFor={item.id}
          className='pharmacology__label'
        >
        <input
          className="input input--bd-radius--small pharmacology__input pharmacology__input--right"
          // id={item.id + 'a'}
          name="calorie"
          type="number"
          min={0}
          // onChange={(e) => changeItem(item.id, {calorie: e.target.value }, type)}
          // value={calorie}
        />
        <span className="label-text">ml</span>
        </label>

      </div>

      <div className="exercise__close">
        <DeleteBtn
          // onClickHandler={() => removeItem(item.id, type)}
          btnClasses='btn'
          iconClasses="exercise__close icon"
        />
      </div>
    </div>
  )
}
