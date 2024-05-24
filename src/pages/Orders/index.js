import React from 'react'
import { connect } from 'react-redux'
import './index.css'
import Orders from 'components/Orders'
const mapStateToProps = () => ({})
const OrdersPage = () => {
  return (
    <React.Fragment>
        <h1>Ordenes</h1>
        <Orders />
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(OrdersPage)
