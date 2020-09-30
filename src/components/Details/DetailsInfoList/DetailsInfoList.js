import React from 'react'
import { DetailsInfo } from '../DetailsInfo/DetailsInfo'
import './DetailsInfoList.scss'
import { getTimeString } from '../../Month/utils'
import { getPropertyWithString } from '../utils'

export const DetailsInfoList = ({state, changeValue, items, showTitle, showIcon, children}) => {
  const inputHandler = (e) => {
    if (e.target.name === "start" || e.target.name === "end") {
      // console.log('value', e.target.value)
      const value = getTimeString(e.target.value)
      changeValue(e.target.name, value)
    } else {
      changeValue(e.target.name, e.target.value)
    }
  }
  return (
    <ul className="info">
      {
        items.map(item => {
          const inputHandler = (e) => {
            if (e.target.name === "start" || e.target.name === "end") {
              // console.log('value', e.target.value)
              const value = getTimeString(e.target.value)
              changeValue(item.path, value)
            } else {
              changeValue(item.path, e.target.value)
            }
          }
          return (
            <DetailsInfo
              key={item.attr.name}
              item={item}
              data={getPropertyWithString(state, item.path) || null}
              inputHandler={inputHandler}
              showTitle={showTitle}
              showIcon={showIcon}
            />
          )
        })
      }
      {children}
    </ul>
  )
}
