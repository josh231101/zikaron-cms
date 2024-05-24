import React from 'react'
import { withRouter } from 'react-router-dom'

const LoginLayout = ({ children }) => {
  return <div>{children}</div>
}

export default withRouter(LoginLayout)
