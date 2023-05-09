import { axi, authAxios } from "./useAxios";
import jwt_decode from "jwt-decode"

export const follow = async (username) => {
  await authAxios.post(`/users/follow/${username}/`)
}

export const reco = async () => {
  const res = await authAxios.get('/users/reco/')
  return res.data
}

export const q = async (query) => {
  const res = await authAxios.get(`/users/u/search/?query=${query}`)
  return res.data
}

export const updateProfile = async (data) => {
  await authAxios.put(`/users/${localStorage.getItem('username')}/`, data)
}

export const userProfile = async (username) => {
  const res = await authAxios.get(`/users/${username}/`)
  return res.data
}

export const registerReq = async (data) => {
  await axi.post('/users/register/', data)
}

export const loginReq = async (data) => {
  const res = await axi.post('/users/login/', data)
  const { access, refresh } = res.data

  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)

  const user = jwt_decode(localStorage.getItem('access'))

  localStorage.setItem('username', user.username)
  localStorage.setItem('user_id', user.user_id)
  localStorage.setItem('avatar', user.avatar)
}

