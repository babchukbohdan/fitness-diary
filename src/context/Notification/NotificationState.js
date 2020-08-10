import React from 'react'
import { NotificationContext } from './notificationContext'
import {Growl} from 'primereact/growl';
import { useRef } from 'react';
import { useState } from 'react';

export const NotificationState = ({children}) => {
  let growl = useRef(null);

  const showNotification = (props) => {
    growl.current.show(props);
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification
      }}
    >
      {children}
      <Growl ref={growl} />
    </NotificationContext.Provider>
  )
}
