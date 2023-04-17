import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import { logout } from "./apiUsers"

export const ax = axios.create({
  baseURL: "http://127.0.0.1:8000/",
})

export const api = () => {

let userInfo = localStorage.getItem('access') 

  console.log(userInfo)

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    'Content-Type': 'multipart/form-data' ,
    headers: { Authorization: `Bearer ${userInfo}` }
  })

  axiosInstance.interceptors.request.use(async req => {

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




