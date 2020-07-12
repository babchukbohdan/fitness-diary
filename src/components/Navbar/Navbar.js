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

// import bg from './bg.jpg'

import './Navbar.scss'
import { ThemeButton } from '../Settings/ThemeButton';

export const Navbar = () => {
  const [smallWidth, setSmallWidth] = useState(false)
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
          <div className="navbar__user">
            {/* <div className="navbar__background">
              <img src={bg} alt="bg"/>
            </div> */}
              <AvatarIcon className="navbar__avatar"/>
              <p><span className="navbar__name">John Doe</span> <ThemeButton/></p>
              <p><span className="navbar__email">john.doe@gmail.com</span> </p>
          </div>
        </li>


        <li className="navbar__item">
          <NavLink to="/" exact className="navbar__link">
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

      </ul>
    </div>
  )
}
