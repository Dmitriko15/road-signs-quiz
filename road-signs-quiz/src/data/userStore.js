/* This file is key to localStorage operations and entire project flow
Here is a setup for functions:
getUsers() - get users list from localStorage
saveUsers() - store users array back to localStorage
signup() - obtain details for new User
login() - fetch stored user data into localStorage
logout() - remove currently logged user from localStorage
getCurrentUser() - know currently logged user
saveAttempt() - add completed quiz attempt to current user's account
*/

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUserId'

/* ----------------------- GET USERS function -----------------------*/

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

/* ----------------------- SAVE USERS function ----------------------- */

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/* ----------------------- SIGNUP function ----------------------- */

export function signup(email, password) {
  const users = getUsers()
  if (users.some(u => u.email === email)) {
    throw new Error('Account already exists')
  }
  const newUser = { id: crypto.randomUUID(), email, password, attempts: [] }
  saveUsers([...users, newUser])
  localStorage.setItem(CURRENT_USER_KEY, newUser.id)   // auto-login after signup
  return newUser
}

/* ----------------------- LOGIN function ----------------------- */

export function login(email, password) {
  const user = getUsers().find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid credentials')
  localStorage.setItem(CURRENT_USER_KEY, user.id)
  return user
}

/* ----------------------- LOGOUT function ----------------------- */

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

/* ----------------------- CURRENT USER function ----------------------- */

export function getCurrentUser() {
  const id = localStorage.getItem(CURRENT_USER_KEY)
  if (!id) return null
  return getUsers().find(u => u.id === id) || null
}

/* ----------------------- SAVE ATTEMPT function ----------------------- */

export function saveAttempt(userId, attempt) {
  const users = getUsers()
  const updated = users.map(u =>
    u.id === userId ? { ...u, attempts: [...u.attempts, attempt] } : u
  )
  saveUsers(updated)
}