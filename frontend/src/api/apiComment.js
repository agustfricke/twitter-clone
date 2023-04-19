import { api } from "./useAxios"

const axios = api()

export const getComments = async (id) => {
  const response = await axios.get(`/tweets/comments/${id}/`)
  return response.data
}

export const addComment = async (data) => {
  await axios.post(`/tweets/comments/${data.id}/`, data)
}

export const deleteComment = async (id) => {
  await axios.delete(`/tweets/comment/${id}/`)
}

export const editComment = async (id, data) => {
  await axios.put(`/tweets/comment/${id}/`, data)
}


