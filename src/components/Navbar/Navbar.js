import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as ArrowIcon } from "./icons/upload-2.svg";
import { ReactComponent as CalendarIcon } from "./icons/calendar.svg";
import { ReactComponent as TodayTrainingIcon } from "./icons/gym.svg";
import { ReactComponent as ProgressIcon } from "./icons/progress-black.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { ReactComponent as CopyrightIcon } from "./icons/copyright.svg";
import { ReactComponent as TodoIcon } from "./icons/todo.svg";
import { ReactComponent as AvatarIcon } from "./icons/avatar.svg";
import { ReactComponent as AuthIcon } from "./icons/auth.svg";

// import bg from './bg.jpg'

import './Navbar.scss'
import { ThemeButton } from '../Settings/ThemeButton';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/authContext';

export const Navbar = () => {
  const [smallWidth, setSmallWidth] = useState(false)
  const {user} = useContext(AuthContext)
  return (
    <div className={smallWidth ? "navbar navbar--small" : "navbar navbar--big"}>

      <button
        className="navbar__toggle"
        onClick={() => {
          setSmallWidth(!smallWidth)
        }}
      >
        <ArrowIcon className="icon toggle__icon" />
      </button>

      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink to="/user" className="navbar__user">
            {/* <div className="navbar__background">
              <img src={bg} alt="bg"/>
            </div> */}
              <AvatarIcon className="navbar__avatar"/>
              <p><span className="navbar__name">John Doe</span></p>
              {
                user && <p><span className="navbar__email">{user.email}</span></p>
              }
          </NavLink>
        </li>

        <li className="navbar__item">
          <span className="navbar__link">Change &nbsp;<ThemeButton/></span>
        </li>


        <li className="navbar__item">
          <NavLink to="/callendar" className="navbar__link">
            <CalendarIcon className="navbar__icon icon" />
            <span className="navbar__page">Callendar</span>
          </NavLink>
        </li>

        <li className="navbar__item">

          <NavLink to="/details" className="navbar__link">
            <TodayTrainingIcon className="navbar__icon icon" />
            <span className="navbar__page">Today training</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/progress" className="navbar__link">
            <ProgressIcon className="navbar__icon icon" />
            <span className="navbar__page">Progress</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/settings" className="navbar__link">
            <SettingsIcon className="navbar__icon icon" />
            <span className="navbar__page">Settings</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/copyright" className="navbar__link">
            <CopyrightIcon className="navbar__icon icon" />
            <span className="navbar__page">Copyright</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/todo" className="navbar__link">
            <TodoIcon className="navbar__icon icon" />
            <span className="navbar__page">Todo List</span>
          </NavLink>
        </li>

        {
          !user &&
          <li className="navbar__item">
            <NavLink to="/auth" className="navbar__link">
              <AuthIcon className="navbar__icon icon" />
              <span className="navbar__page">Login</span>
            </NavLink>
          </li>
        }

      </ul>
    </div>
  )
}
