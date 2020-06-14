import React from 'react'
import { DetailsInfo } from '../DetailsInfo/DetailsInfo'
import './DetailsInfoList.scss'

export const DetailsInfoList = ({state, changeValue, items, showTitle, children, showIcon}) => {
  const inputHandler = (e) => {
    changeValue(e.target.name, e.target.value)
  }
  return (
    <ul className="info">
      {
        items.map(item => (
          <DetailsInfo
            key={item.attr.name}
            item={item}
            data={state[item.attr.name]}
            inputHandler={inputHandler}
            showTitle={showTitle}
            showIcon={showIcon}
          />
        ))
      }
      {children}
    </ul>
  )
}
