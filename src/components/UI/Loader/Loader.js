import React from 'react'
import './Loader.sass'

export const Loader = () => {
  return (
    <section className="preloader">
      <div className="preloader__overlay" aria-busy="true" aria-label="Loading" role="progressbar">
        <div className="swing">
          <div className="swing-l"/>
            <div/><div/><div/><div/><div/>
          <div className="swing-r"/>
        </div>
        <div className="shadow">
          <div className="shadow-l"/>
            <div/><div/><div/><div/><div/>
          <div className="shadow-r"/>
        </div>
      </div>
    </section>
  )
}
