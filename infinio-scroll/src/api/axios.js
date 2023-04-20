import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/tweets'
})

export const getPostsPage = async (pageParam = 1, options = {}) => {
    const response = await api.get(`/?page=${pageParam}&pages=2`, options)
    return response.data
}

// import axios from 'axios'

// export const api = axios.create({
//     baseURL: 'https://jsonplaceholder.typicode.com'
// })

// export const getPostsPage = async (pageParam = 1, options = {}) => {
//     const response = await api.get(`/posts?_page=${pageParam}`, options)
//     return response.data
// }
