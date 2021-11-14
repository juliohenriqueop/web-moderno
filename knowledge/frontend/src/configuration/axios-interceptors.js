import axios from 'axios'
import Vue from 'vue'

function handleSuccessResponse(response) {
  return response
}

function handleErrorResponse(error) {
  const errorMessage = error.response.data.message || null

  if (errorMessage) {
    Vue.toasted.global.ErrorToast(errorMessage)
  }

  return Promise.reject(errorMessage)
}

axios.interceptors.response.use(
  handleSuccessResponse,
  handleErrorResponse
)