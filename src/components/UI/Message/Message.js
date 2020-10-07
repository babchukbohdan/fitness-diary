import React from 'react'
import './Message.scss'

export const Message = ({children}) => {
  return (
    <div className="message">
      {children}
    </div>
  )
}
