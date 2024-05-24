import React from 'react'
import { withRouter } from 'react-router-dom'

function AuthLayout({ children }) {
  return (
    <div>
      <h1>AuthLayout</h1>
      { children }
    </div>
  )
}

export default withRouter(AuthLayout)
