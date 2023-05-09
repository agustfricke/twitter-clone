import { authAxios } from "./useAxios";

export const mark = async () => {
  await authAxios.put("/noti/leer/");
}

export const getNoLeidas = async () => {
  const res = await authAxios.get("/noti/no/");
  return res.data;
}

export const getNoti = async () => {
  const res = await authAxios.get("/noti/");
  return res.data;
}

