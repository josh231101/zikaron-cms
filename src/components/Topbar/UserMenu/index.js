import React from 'react'
import { connect } from 'react-redux'
import config from 'config'
import { Menu, Dropdown, Avatar, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './style.css'


const mapStateToProps = ({ user }) => ({
  user,
})

const ProfileMenu = ({ dispatch, user, }) => {

  const logout = e => {
    e.preventDefault()
    notification.info({
      message: 'Sesión terminada',
      description: 'Hasta pronto'
    })
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>
          Hola, {user.first_name || 'Anonymous'}
        </strong>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div>
          <strong>
            Email:{' '}
          </strong>
          {user.email || '—'}
          <br />
          <strong>
            Teléfono:{' '}
          </strong>
          {user.phone || '—'}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#" onClick={logout}>
          <i className="fe fe-log-out mr-2" />
          Cerrar sesión
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <div id="user-menu" className="dropdown">
          {user.profileImage ? (
            <Avatar
              style={{ borderRadius: '50%' }}
              className="avatar"
              shape="square"
              size="large"
              src={`${config.imageSrc}${user.profileImage}`}
            />
          ) : (
            <Avatar style={{ borderRadius: '50%' }} className="avatar" shape="square" size="large" icon={<UserOutlined />} />
          )}
        </div>
      </Dropdown>
    </>
  )
}

export default connect(mapStateToProps)(ProfileMenu)
