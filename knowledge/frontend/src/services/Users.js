import axios from 'axios'

const backend = process.env.VUE_APP_BACKEND_URL
const usersEndPoint = process.env.VUE_APP_USERS_ENDPOINT

export default {
  async fetchUsers() {
    const URL = `${backend}/${usersEndPoint}`
    const response = await axios.get(URL)

    const users = response.data.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin
      }
    })

    return users
  },

  async createUser({
    name,
    email,
    password
  }) {
    const URL = `${backend}/${usersEndPoint}`

    const user = {
      name,
      email,
      password
    }

    const response = await axios.post(URL, user)
    const responseBody = response.data

    const token = responseBody.token

    return token
  },

  async updateUser({
    id,
    name,
    email,
    password
  }) {
    const URL = `${backend}/${usersEndPoint}/${id}`

    const user = {
      name,
      email,
      password
    }

    return axios.put(URL, user)
  },

  async deleteUser(id) {
    const URL = `${backend}/${usersEndPoint}/${id}`
    return axios.delete(URL)
  }
}