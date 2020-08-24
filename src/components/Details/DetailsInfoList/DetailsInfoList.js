import React from 'react'
import { DetailsInfo } from '../DetailsInfo/DetailsInfo'
import './DetailsInfoList.scss'
import { getTimeString } from '../../Month/utils'

export const DetailsInfoList = ({state, changeValue, items, showTitle, showIcon, children}) => {
  const inputHandler = (e) => {
    if (e.target.name === "start" || e.target.name === "end") {
      // console.log('value', e.target.value)
      const res = getTimeString(e.target.value)
      changeValue(e.target.name, res)
    } else {
      changeValue(e.target.name, e.target.value)
    }
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
