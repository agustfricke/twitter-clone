import { api } from "./useAxios"

const axios = api()


export const addTweet = async (data) => {
  await axios.post('/tweets/create/', data)
}

export const getTweets = async () => {
  const response = await axios.get('/tweets/tweets/')
  return response.data
}
