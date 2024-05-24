import React from 'react'
import { connect } from 'react-redux'
import './index.css'
const mapStateToProps = () => ({})
const Dashboard = () => {
  return (
    <div className="dashboard-welcome">
      <div class="dashboard-container">
        <img src="images/zikaron.png" style={{ width: 500 }} alt="grupo locsa" />
      </div>
      <div>
        <h1>¡Bienvenido!</h1>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Dashboard)
