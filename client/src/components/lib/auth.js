// * Set user token
export function setToken(token) {
  window.localStorage.setItem('token', token)
}

// * Get user token
export function getToken() {
  return window.localStorage.getItem('token')
}

// * Logout a user
export function logoutUser() {
  window.localStorage.removeItem('token')
}
