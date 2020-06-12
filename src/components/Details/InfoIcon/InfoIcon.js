import React from 'react'
import { Icon } from '../../UI/Icon/Icon'

export const InfoIcon = ({name}) => {
  return (
    <Icon
      clazz='info__icon'
      name={name}
      path={`${name}.svg`}
    />
  )
}
