/* This file is key to localStorage operations and entire project flow
Here is a setup for functions:
getUsers() - get users list to localStorage
saveUsers() - store newly created user in localStorage to the file
signup() - obtain details for new User
login() - fetch stored user data into localStorage
logout() - remove currently logged user from localStorage
getCurrentUser() - know currently logged user
saveAttempt() - add completed quiz attempt to current user's account
*/

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUserId'

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || []
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

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

export function login(email, password) {
  const user = getUsers().find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid credentials')
  localStorage.setItem(CURRENT_USER_KEY, user.id)
  return user
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser() {
  const id = localStorage.getItem(CURRENT_USER_KEY)
  if (!id) return null
  return getUsers().find(u => u.id === id) || null
}

export function saveAttempt(userId, attempt) {
  const users = getUsers()
  const updated = users.map(u =>
    u.id === userId ? { ...u, attempts: [...u.attempts, attempt] } : u
  )
  saveUsers(updated)
}