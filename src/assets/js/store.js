export function setItem (key, value) {
  removeItem(key)
  window.sessionStorage.setItem(key, value)
}
export function getItem (key) {
  return window.sessionStorage.getItem(key)
}
export function removeItem (key) {
  window.sessionStorage.removeItem(key)
}
