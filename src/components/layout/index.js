// import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar'
import './index.scss'

const Layout = ({ showPreloader = false }) => {
  return (
    <div className="page">
      {!showPreloader && <Sidebar />}

      <div id="space">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>

      <div className={showPreloader ? 'preloader-page' : 'container'}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout