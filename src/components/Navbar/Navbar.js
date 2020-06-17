import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import bg from './bg.jpg'
import avatar from './avatar.png'

export const Navbar = () => {
  return (
    <div className="navbar">
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
            <img className="navbar__icon icon" src="./img/icons/calendar.svg" alt=""/>
            Callendar
          </NavLink>
        </li>

        <li className="navbar__item">

          <NavLink to="/details" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/gym.svg" alt=""/>
            Today training
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/settings" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/settings.svg" alt=""/>
            Settings
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/progress" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/progress-black.svg" alt=""/>
            Progress
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/copyright" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/copyright.svg" alt=""/>
            Copyright
          </NavLink>
        </li>

        <li className="navbar__item">
          <NavLink to="/todo" className="navbar__link">
            <img className="navbar__icon icon" src="./img/icons/todo.png" alt=""/>
            Todo List
          </NavLink>
        </li>

      </ul>
    </div>
  )
}
