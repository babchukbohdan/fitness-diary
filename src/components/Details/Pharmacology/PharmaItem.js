import React from 'react'
import { DeleteBtn } from '../../UI/DeleteBtn/DeleteBtn'

export const PharmaItem = ({ index, item, removeItem, changePharma }) => {
  const { dose, id, name } = item
  console.log(name, 'name')
  console.log(dose, 'dose')
  const inputHandler = (e) => {
    changePharma(id, {
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="exercise">
      <div className="pharmacology__container">
        <label
          // htmlFor={id}
          className='pharmacology__label'
        ><span className="label-text">{index + 1}</span>
          <input
            name="name"
            // id={item.id}
            onChange={inputHandler}
            value={name}
            type="text"
            className="input input--bd-radius--small pharmacology__input"
          // autoComplete={'false'}
          />
        </label>
        <label
          // htmlFor={item.id}
          className='pharmacology__label'
        >
          <input
            className="input input--bd-radius--small pharmacology__input pharmacology__input--right"
            // id={item.id + 'a'}
            name="dose"
            type="text"
            // min={0}
            onChange={inputHandler}
            value={dose}
          />
          <span className="label-text">ME</span>
        </label>

      </div>

      <div className="exercise__close">
        <DeleteBtn
          onClickHandler={() => removeItem(id)}
          btnClasses='btn btn--outlined btn--hovered'
          iconClasses="exercise__close icon"
        />
      </div>
    </div>
  )
}
