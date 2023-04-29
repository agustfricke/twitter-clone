import { api } from "./useAxios"

const axios = api()
const controller = new AbortController();

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

export const getTweets = async ({ pageParam = 1 }) => {
  const response = await axios.get(`http://localhost:8000/tweets/?page=${pageParam}&pages=2`)
  return response.data
}

