import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Topbar from 'components/Topbar'
import './style.css'

function MainLayout({ children }) {
  return (
    <Layout>
      <Layout>
        <Layout.Header>
          <div className="">
            {/** NAVIGATION */}
            <Menu />
          </div>
          <Topbar />
        </Layout.Header>
        <Layout.Content style={{ height: '100%', position: 'relative' }}>
          <div className="content-layout">
            <div className="content-layout__frame">
              {children}
            </div>
          </div>
        </Layout.Content>
      </Layout>{' '}
    </Layout>
  )
}

export default withRouter(MainLayout)
