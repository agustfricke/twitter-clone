import { authAxios } from "./useAxios";

export const getChat = async (username) => {
  const response = await authAxios.get(`/chat/canal/${username}/`);
  return response.data;
}
