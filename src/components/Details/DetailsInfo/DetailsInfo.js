import React from 'react'
import { InfoIcon } from '../InfoIcon/InfoIcon'


export const DetailsInfo = ({item, inputHandler, data, showTitle, showIcon}) => {
  const {attr, beforeInput, afterInput, img = false} = item
  return (
    <li className="info__item">
      {
        showIcon && img && <InfoIcon name={attr.name} />
      }

      {showTitle && beforeInput && beforeInput}
      <input
        {...attr}
        value={data}
        onChange={inputHandler}
      />
      {afterInput && afterInput}
    </li>
  )
}
