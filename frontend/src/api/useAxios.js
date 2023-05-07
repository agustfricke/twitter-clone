import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import { logout } from "./apiUsers"

export const ax = axios.create({
  baseURL: "http://127.0.0.1:8000/",
})


export const api = () => {
  

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    'Content-Type': 'multipart/form-data' ,
  })

  axiosInstance.interceptors.request.use(async req => {

let userInfo = localStorage.getItem('access') 

  console.log('Token', userInfo)

  req.headers = {
    Authorization: `Bearer ${userInfo}`
  }

    if(!userInfo) {
        let userInfo = localStorage.getItem('access') 
        req.headers.Authorization = `Bearer ${userInfo}`
    }


    const tokenDecoded = jwt_decode(userInfo)
    const isExpired = dayjs.unix(tokenDecoded.exp).diff(dayjs()) < 1


    if (!isExpired) {
      console.log('token no expiro, sigue navegando')
        return req

    } else {

      try {
        console.log('token expiro, intentando refrescar')
      const response = await axios.post('http://127.0.0.1:8000/users/refresh/', {
        refresh: localStorage.getItem('refresh')
      })
      localStorage.setItem('access', response.data.access)
      localStorage.setItem('refresh', response.data.refresh)

        console.log('nuevo access token: ', response.data.access)
      req.headers.Authorization = `Bearer ${response.data.access}`
      return req

      } catch (err) {
        if (err.response.status == 401 || 400) {
          console.log('token expiro y no se pudo refrescar asi que te vas!!!')
          logout()
        }
      }
    }
  })

  return axiosInstance
}

import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://127.0.0.1:8000";

export const axi = axios.create({
  baseURL,
})

export const authAxios = axios.create({
  baseURL,
  withCredentials: true,
})

authAxios.interceptors.request.use(async (config) => {

  const access = localStorage.getItem('access')

  config.headers = {
    'Authorization': `Bearer ${access}`,
  } 

  const decoded = jwt_decode(access)

  const exp = new Date(decoded.exp *1000)
  const now = new Date()
  const five = 1000 * 60 * 5

  console.log(exp.getTime() - now.getTime())
  console.log(five)

  if (exp.getTime() - now.getTime() < five) {
    // console.log(now.getTime() - exp.getTime())

    console.log(exp, now)
    console.log('token is 5 minutes from expiring')

    try {

      const res = await axios.post(`${baseURL}/users/refresh/`, {
        refresh: localStorage.getItem('refresh')
      })

      const { access, refresh } = res.data

      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)

    } catch(err) {
      if(err.response.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
  } else {
    console.log('token is still valid')
    return config
  }

  return config

})












