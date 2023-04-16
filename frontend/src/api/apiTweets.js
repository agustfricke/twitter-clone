import { api } from "./useAxios"

const axios = api()

export const editTweet = async (data) => {
  await axios.put(`/tweets/${data.id}/`, data)
}

export const deleteTweet = async (id) => {
  await axios.delete(`/tweets/${id}`)
}

export const userTweets = async () => {
  const response = await axios.get(`/tweets/user/`)
  return response.data
}

export const addTweet = async (data) => {
  await axios.post('/tweets/', data)
}

export const getTweets = async () => {
  const response = await axios.get('/tweets/')
  return response.data
}
