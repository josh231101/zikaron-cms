import apiClient from 'services/axios'
import store from 'store'

export async function login(email, password) {
  return apiClient
    .post('/login', {
      email,
      password
    })
    .then(res => {
      console.log('res. ', res)
      if(!res) return false
      if (res.status === 200) {
        return res.data
      }
      return false
    })
    .catch(err => {
      console.warn(err.message)
      return false
    })
}

export async function currentAccount() {
  return apiClient
    .get('/me')
    .then(response => {
      if (response) {
        const { token } = response.data
        if (token) {
          store.set('accessToken', token)
        }
        // Inside response.data user object defines all the relevant user info
        return response.data ? response.data : false
      }
      return false
    })
    .catch(err => {
      console.warn('Error: ', err)
      return false
    })
}



export async function logout(){
  const accessToken = store.get('accessToken')
  store.remove('accessToken')
  return apiClient
    .post('/logout',{
      user: accessToken
    })
    .then(res => res)
    .catch(err => {
      console.warn('Error during logout')
    })
}
