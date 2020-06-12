import React from 'react'
import { DetailsInfo } from '../DetailsInfo/DetailsInfo'




export const DetailsInfoList = ({state, changeValue, items, showTitle, children}) => {
  const inputHandler = (e) => {
    changeValue(e.target.name, e.target.value)
  }
  return (
    <ul className="details__list">
      {
        items.map(item => (
          <DetailsInfo
            key={item.attr.name}
            item={item}
            data={state[item.attr.name]}
            inputHandler={inputHandler}
            showTitle={showTitle}
          />
        ))
      }
      {children}
    </ul>
  )
}
