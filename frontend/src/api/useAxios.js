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












