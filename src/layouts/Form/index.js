import React from 'react'

const Form = ({ children }) => {
  return (
    <div className="colorlab-grid">
      <div>{children}</div>
      <div className="colorlab-grid__image" style={{ backgroundImage: "url('/images/colors.png')" }}></div>
    </div>
  )
}

export default Form
