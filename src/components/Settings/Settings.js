import React from 'react'

import './Settings.scss'
import { ThemeButton } from './ThemeButton'

export const Settings = () => {

  return (
    <div className='settings wrap'>
      <h1>Settings</h1>

      <div className="group">
        <span className="group-title">Dark theme:</span>
        <ThemeButton />
      </div>

    </div>
  )
}
