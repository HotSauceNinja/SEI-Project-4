import axios from 'axios'

const baseUrl = '/api/'

// REQUESTS
// * Cinema Requests
export function getAllCinemas() {
  return axios.get(`${baseUrl}cinemas/`)
}