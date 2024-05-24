import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './user/reducers'
import settings from './settings/reducers'

const reducer = history =>  combineReducers({
  router: connectRouter(history),
  user,
  settings
})
export default reducer

