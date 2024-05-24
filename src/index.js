import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './redux/reducers'
import sagas from './redux/sagas'
import Router from './router'

import 'antd/dist/antd.css';
import './index.css'

// middlewared
const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]
// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }
const store = createStore(reducers(history), composeWithDevTools(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
)

export { store, history}
