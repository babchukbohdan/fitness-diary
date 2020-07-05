import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme/themeContext'

export const ThemeButton = () => {
  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <label className="switch group-value">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={(e) => {
          if (e.target.checked) setTheme('dark')
          else setTheme('light')
          // console.log(e.target.checked)
        }}
      />
      <span className="slider round"/>
    </label>
  )
}
