'use strict'

const KEY = 'userDB'

let gUser

_createUser()

function getUser() {
  return gUser
}

function setUser(user) {
  gUser = user

  _saveUserToStorage()
}

function _createUser() {
  let user = _loadUserFromStorage()

  if (user) {
    gUser = user
    return
  }

  // Demo user
  user = {
    email: '',
    age: 30,
    bgc: '#fff',
    textColor: '#000',
    birtDate: Date.now(),
    birthTime: Date.now(),
    gender: 'male',
  }

  gUser = user

  _saveUserToStorage()
}

function _loadUserFromStorage() {
  return loadFromStorage(KEY)
}

function _saveUserToStorage() {
  saveToStorage(KEY, gUser)
}
