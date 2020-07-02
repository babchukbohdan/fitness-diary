import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import bg from './bg.jpg'
import avatar from './avatar.png'
import { ReactComponent as ArrowIcon } from "./upload-2.svg";
import { useState } from 'react'

export const Navbar = () => {

  const [smallWidth, setSmallWidth] = useState(false)
  return (
    <div className={smallWidth ? "navbar small" : "navbar"}>

      <button
        className="navbar__toggle"
        onClick={() => {
          setSmallWidth(!smallWidth)
        }}
      >
        <ArrowIcon className="icon" />
      </button>

      <ul className="navbar__list">
        <li className="navbar__item">
          <div className="navbar__user">
            <div className="navbar__background">
              <img src={bg} alt="bg"/>
            </div>
              <img className="navbar__avatar" src={avatar} alt="avatar"/>
              <p className="navbar__name">John Doe</p>
              <p className="navbar__email">john.doe@gmail.com</p>
          </div>
        </li>


        <li className="navbar__item">
          <NavLink to="/" exact className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/calendar.svg" alt="Callendar"/>
            <span className="navbar__page">Callendar</span>
          </NavLink>
        </li>

        <li className="navbar__item">

          <NavLink to="/details" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/gym.svg" alt="Today training"/>
            <span className="navbar__page">Today training</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/settings" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/settings.svg" alt="Settings"/>
            <span className="navbar__page">Settings</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/progress" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/progress-black.svg" alt="Progress"/>
            <span className="navbar__page">Progress</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/copyright" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/copyright.svg" alt="Copyright"/>
            <span className="navbar__page">Copyright</span>
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/todo" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/todo.png" alt="Todo List"/>
            <span className="navbar__page">Todo List</span>
          </NavLink>
        </li>

      </ul>
    </div>
  )
}
