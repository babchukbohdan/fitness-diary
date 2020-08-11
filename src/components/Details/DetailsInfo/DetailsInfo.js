import React from 'react'

export const DetailsInfo = ({item, inputHandler, data, showTitle, showIcon}) => {
  const {attr, beforeInput, afterInput, Img = false, Component = false} = item
  // console.log(attr.name, data)
  const setDate = (time) => {
    let [hours, min] = time.split(':')
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(min)
    return date
  }

  return (
    <li className="info__item">
      {
        showIcon && Img && <Img name={attr.name} className="info__icon icon" />
      }

      {showTitle && beforeInput}
      {
        Component
          ? <Component
              panelClassName='PANEL__NAME'
              inputClassName="input"
              name={attr.name}
              timeOnly={true}
              showTime={true}
              hourFormat="24"
              value={setDate(data)}
              onChange={inputHandler}
            />
          : <input
              {...attr}
              className="input"
              value={data}
              onChange={inputHandler}
            />
      }
      {afterInput && afterInput}
    </li>
  )
}
