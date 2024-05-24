import axios from 'axios'
import config from 'config'
import store from 'store'

const apiClient = axios.create({
  baseURL: `${config.homeUrl}`
})

apiClient.interceptors.request.use(request => {
  // const accessToken = store.get('accessToken')
  // if(accessToken){
  //   request.headers.Authorization = `Bearer ${accessToken}`
  //   request.headers.AccessToken = accessToken
  // }
  return request
})

export default apiClient
