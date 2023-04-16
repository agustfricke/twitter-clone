import { ax } from "./useAxios"
import { api } from "./useAxios"

const axios = api()

// const username = localStorage.getItem('username')

export const register = async (data) => {
  await ax.post('/users/register/', data)
}

export const logout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('username')
}

export const getUserInfo = async (username) => {
  const response = await axios.get(`/users/users/${username}/`)
  return response.data
}

export const login = async (data) => {
  const response = await ax.post('/users/login/', data)
  const { access, refresh } = response.data
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}

