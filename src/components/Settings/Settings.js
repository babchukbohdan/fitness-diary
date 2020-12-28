import React from 'react'

import { ThemeButton } from './ThemeButton'

import './Settings.scss'

export const Settings = () => {

  return (
    <div className='settings wrap'>
      <h1 className="settings__title" >Settings</h1>

      <div className="group">
        <span className="group-title">Dark theme:</span>
        <ThemeButton />
      </div>
    </div>
  )
}
