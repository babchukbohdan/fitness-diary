import React from 'react'

export const Icon = ({clazz, name, path}) => {
  const clazzNames = ['icon']
  clazzNames.push(clazz)
  return (
    <img
      className={clazzNames.join(' ')}
      src={`./img/icons/${path}`}
      alt={name}
    />
  )
}
