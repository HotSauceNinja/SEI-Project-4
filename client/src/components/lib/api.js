import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api/'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

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

export function createFilm(formdata) {
  return axios.post(`${baseUrl}films/`, formdata, headers())
}

export function editFilm(id, formdata) {
  return axios.put(`${baseUrl}films/${id}/`, formdata, headers())
}

export function deleteFilm(id) {
  return axios.delete(`${baseUrl}films/${id}/`, headers())
}

// * Scheduling Slot Requests
export function getAllSlots() {
  return axios.get(`${baseUrl}slots/`)
}

export function getSingleSlot(id) {
  return axios.get(`${baseUrl}slots/${id}/`)
}

export function createSlot(formdata) {
  return axios.post(`${baseUrl}slots/`, formdata, headers())
}

export function editSlot(id, formdata) {
  return axios.put(`${baseUrl}slots/${id}/`, formdata, headers())
}

export function deleteSlot(id) {
  return axios.delete(`${baseUrl}slots/${id}/`, headers())
}

// * Auth Requests
export function registerUser(formdata) {
  return axios.post(`${baseUrl}auth/register/`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}auth/login/`, formdata)
}
