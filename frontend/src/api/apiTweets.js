import { api } from "./useAxios"

const axios = api()

export const addTweet = async (data) => {
  await axios.post('/tweets/', data)
}

export const getTweets = async () => {
  const response = await axios.get('/tweets/')
  return response.data
}
