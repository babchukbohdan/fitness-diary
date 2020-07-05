import React from 'react'

export const DetailsInfo = ({item, inputHandler, data, showTitle, showIcon}) => {
  const {attr, beforeInput, afterInput, Img = false} = item
  return (
    <li className="info__item">
      {
        showIcon && Img && <Img name={attr.name} className="info__icon icon" />
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
