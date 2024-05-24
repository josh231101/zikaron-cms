import actions from './actions'

const initialState = {
  id: '',
  name: '',
  email: '',
  authorized: process.env.REACT_APP_AUTHENTICATED || false,
  loading: false,
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload}
    case actions.RESET_STATE:
      return initialState
    default:
      return state
  }
}
