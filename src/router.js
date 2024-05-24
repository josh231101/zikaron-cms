import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  // Other
  {
    path: '/dashboard',
    Component: lazy(() => import('pages/Dashboard')),
    exact: true,
  },
  // Orders
  {
    path: '/orders',
    Component: lazy(() => import('pages/Orders')),
    exact: true,
  },
  // Orders
  {
    path: '/markers',
    Component: lazy(() => import('pages/Markers')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/400')),
    exact: true,
  },
]

const mapStateToProps = ({ settings, user }) => ({
  routerAnimation: settings.routerAnimation,
  user,
})

const withAccessControl = (Component, acl) => (currentUserRole) => {
  if (!acl) {
    return <Component />
  }
  const decision = acl[currentUserRole]
  if (!decision || decision.allow === true) {
    return <Component />
  } else if (decision.allow === false && decision.redirect) {
    return <Redirect to="auth/404" />
  }
  return <div>Ocurrió un error</div>
}

const Router = ({ history, routerAnimation, user }) => {
  const currentUserRole = user.role || 'guest'
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                    {routes.map(({ path, Component, exact, acl = {} }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => (
                          <React.Fragment>
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                {acl ? (
                                  withAccessControl(Component, acl)(currentUserRole)
                                ) : (
                                  <Component />
                                )}
                              </Suspense>
                            </div>
                          </React.Fragment>
                        )}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
