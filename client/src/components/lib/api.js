import axios from 'axios'

const baseUrl = '/api/'

// REQUESTS
// * Cinema Requests
export function getAllCinemas() {
  return axios.get(`${baseUrl}cinemas/`)
}

// * Film Requests
export function getAllFilms() {
  return axios.get(`${baseUrl}films/`)
}

export function getSingleFilm(id) {
  return axios.get(`${baseUrl}films/${id}/`)
}
