import { api } from "./useAxios"

const axios = api()

export const getChat = async (username) => {
  const response = await axios.get(`/chat/canal/${username}/`)
  return response.data
}

