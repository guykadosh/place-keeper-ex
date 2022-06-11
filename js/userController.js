'use strict'

function initUser() {
  renderUserColors()
}

function renderUserColors() {
  const user = getUser()

  // Changes body colors to user pereferences
  const elBody = document.body
  elBody.style.backgroundColor = user.bgc
  elBody.style.color = user.textColor
}

function onSetUser(ev) {
  ev.preventDefault()

  const email = document.querySelector('[name="email"]').value
  const age = +document.querySelector('[name="age"]').value
  const bgc = document.querySelector('[name="bgc-color"]').value
  const textColor = document.querySelector('[name="text-color"]').value
  const birthDate = document.querySelector('[name="dob"]').value
  const birthTime = document.querySelector('[name="bt"]').value
  const gender = document.querySelector('[name="gender"]').value

  const user = {
    email,
    age,
    bgc,
    textColor,
    birthDate,
    birthTime,
    gender,
  }

  setUser(user)
  renderUserColors()
}
