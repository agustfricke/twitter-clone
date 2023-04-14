import { ax } from "./useAxios"

export const login = async (data) => {
  const response = await ax.post('/users/login/', data)
  const { access, refresh } = response.data
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}
