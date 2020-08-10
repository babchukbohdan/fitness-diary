import React, {useState} from 'react'
import { ThemeContext } from './themeContext'

export const ThemeState = ({children}) => {

  const [theme, setTheme] = useState('dark')


  return (
    <ThemeContext.Provider value={{
      theme, setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
