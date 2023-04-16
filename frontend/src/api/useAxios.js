import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"

export const ax = axios.create({
  baseURL: "http://127.0.0.1:8000/",
})

export const api = () => {

  const userInfo = localStorage.getItem('access')

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: { Authorization: `Bearer ${userInfo}` }
  })

  axiosInstance.interceptors.request.use(async req => {

    const user = jwt_decode(localStorage.getItem('access'))
    localStorage.setItem('username', user.username)
    localStorage.setItem('avatar', user.avatar)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) > 1

    if (!isExpired) {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('username')
    } else {
      console.log('Sending refresh token') 
      const response = await axios.post('http://127.0.0.1:8000/users/refresh/', {
        refresh: localStorage.getItem('refresh')
      })
      console.log('Token sent... New Access and refresh $: ', response.data)
      localStorage.setItem('access', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)
      req.headers.Authorization = `Bearer ${response.data.access}`
      return req
    }
  })

  return axiosInstance
}




