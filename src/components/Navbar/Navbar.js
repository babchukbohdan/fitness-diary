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
              <span className="navbar__name">John Doe</span>
              <span className="navbar__email">john.doe@gmail.com</span>
          </div>
        </li>
        <li className="navbar__item"><NavLink to="/settings" className="navbar__link">Settings</NavLink></li>
        <li className="navbar__item"><NavLink to="/" exact className="navbar__link">Month</NavLink></li>
        <li className="navbar__item"><NavLink to="/details" className="navbar__link">Details</NavLink></li>
        <li className="navbar__item"><NavLink to="/progress" className="navbar__link">Progress</NavLink></li>
      </ul>
    </div>
  )
}
