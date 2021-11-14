import axios from 'axios'

const baseURL = 'http://localhost:3001/users'

export async function loadUsers() {
  const response = await axios.get(baseURL)
  const data = response.data

  return data
}

export async function saveUser(user) {
  return axios.post(baseURL, user)
}

export async function updateUser(user) {
  const url = `${baseURL}/${user.id}`
  return axios.put(url, user)
}

export async function deleteUser(user) {
  const url = `${baseURL}/${user.id}`
  return axios.delete(url, user)
}

export default {
  loadUsers,
  saveUser,
  updateUser,
  deleteUser
}