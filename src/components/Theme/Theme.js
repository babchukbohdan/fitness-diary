import React, { useContext } from 'react'
import { ThemeContext } from '../../context/theme/themeContext'

import './Theme.scss'

export const Theme = ({children}) => {
  const {theme} = useContext(ThemeContext)
  return (
    <main className={`theme ${theme}`} >
      {children}
    </main>
  )
}
