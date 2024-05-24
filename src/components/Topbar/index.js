import React from 'react'
import { connect } from 'react-redux'
import UserMenu from 'components/Topbar/UserMenu'
import './style.css'
import Menu from 'components/Menu'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ dispatch, settings }) => ({
  dispatch,
  theme: settings.theme,
})

const TopBar = ({ dispatch, selectedDomain, theme }) => {
  return (
    <nav className="topbar">
      <div className="mr-1">
        <Link to="/dashboard">
          <img src="./images/home.png" alt="Dashboard" height={24} />
        </Link>
      </div>
      <div className="mr-auto">
        <Menu />
      </div>
      <div className="logo-topbar">
        <img src="./images/zikaron.png" alt="ColorLab" height={40} />
      </div>
      <div className="ml-auto">
        <UserMenu />
      </div>
    </nav>
  )
}

export default connect(mapStateToProps)(TopBar)
