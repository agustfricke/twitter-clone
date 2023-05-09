import { authAxios } from "./useAxios";

export const editComment = async (data) => {
  await authAxios.put(`/tweets/comment/${data.id}/`, data);
}

export const deleteComment = async (id) => {
  await authAxios.delete(`/tweets/comment/${id}/`);
}

export const addComment = async (data) => {
  await authAxios.post(`/tweets/comments/${data.id}/`, data);
}

export const getComments = async (id) => { 
  const response = await authAxios.get(`/tweets/comments/${id}/`);
  return response.data;
}

export const getUserLikes = async (username)  => {
  const response = await authAxios.get(`/tweets/likes/${username}/`);
  return response.data;
}

export const getUserRt = async (username)  => {
  const response = await authAxios.get(`/tweets/rt/${username}/`);
  return response.data;
}

export const getSoloTweet = async (id) => {
  const response = await authAxios.get(`/tweets/${id}/`);
  return response.data;
}

export const rt = async (id) => {
  await authAxios.post(`/tweets/rt/${id}/`);
}

export const like = async (id) => {
  await authAxios.post(`/tweets/like/${id}/`);
}

export const deleteTweet = async (id) => {
  await authAxios.delete(`/tweets/${id}/`);
}

export const editTweet = async (data) => {
  await authAxios.put(`/tweets/${data.get('id')}/`, data);
}

export const getUserTweets = async (username) => {
  const response = await authAxios.get(`/tweets/my/${username}`);
  return response.data;
}

export const addTweet = async (data) => {
  await authAxios.post("/tweets/", data);
}

export const getTweets = async ({ pageParam = 1 }) => {
  const response = await authAxios.get(`/tweets/?page=${pageParam}&pages=10`);
  return response.data;
}

