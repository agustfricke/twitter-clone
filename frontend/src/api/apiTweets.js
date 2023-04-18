import { api } from "./useAxios"

const axios = api()

export const retweet = async (id) => {
  await axios.post(`/tweets/retweet/${id}/`)
}

export const likeTweet = async (id) => {
  await axios.post(`/tweets/like/${id}/`)
}

export const editTweet = async (data) => {
  await axios.put(`/tweets/${data.id}/`, data)
}

export const deleteTweet = async (id) => {
  await axios.delete(`/tweets/${id}`)
}

export const getSoloTweet = async (id) => {
  const response = await axios.get(`/tweets/${id}/`)
  return response.data
}

export const userTweets = async (username) => {
  const response = await axios.get(`/tweets/${username}/`)
  return response.data
}

export const addTweet = async (data) => {
  await axios.post('/tweets/', data)
}

export const getTweets = async () => {
  const response = await axios.get('/tweets/')
  return response.data
}
