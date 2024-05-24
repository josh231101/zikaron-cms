import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { Dropdown, Space, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const regionsMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/regions">Regiones</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/states">Estados</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/localities">Localidades</Link>{' '}
    </Menu.Item>
  </Menu>
)

const _Menu = () => {
  return (
    <ul className="topbar__menu">
      <li>
        <Link to="/orders">Pedidos</Link>
      </li>
      <li>
        <Link to="/markers">Markers</Link>
      </li>
    </ul>
  )
}

export default _Menu
