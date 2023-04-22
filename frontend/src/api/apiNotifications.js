import { api } from "./useAxios"

const axios = api()

export const getNoti = async () => {
  const response = await axios.get(`/noti/noti/`)
  return response.data
}

