import { api } from "./useAxios"

const axios = api()

export const getNoti = async () => {
  const response = await axios.get(`/noti/noti/`)
  return response.data
}

export const no_l = async () => {
  const response = await axios.get(`/noti/no_l/`)
  return response.data
}

export const read_noti = async () => {
  await axios.put(`/noti/leer/`)
}


