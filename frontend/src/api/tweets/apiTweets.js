import { api } from "../useAxios"

const axios = api()

export const getTweets = async () => {
  const response = await axios.get('/tweets/tweets/')
  return response.data
}
