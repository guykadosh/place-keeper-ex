'use strict'

function init() {
  renderUserNextBirthDay()
}

function renderUserNextBirthDay() {
  const user = getUser()

  let [year, month, day] = user.birthDate.split('-')
  let [hour, minute] = user.birthTime.split(':')

  // Set to current year
  year = new Date().getFullYear()

  const nextBirthDayStr = `${year}-${month}-${day}`

  // Get next birthday
  let nextBirthDay = new Date(nextBirthDayStr)

  // Check if birthday passed this year
  if (Date.now() > nextBirthDay) {
    nextBirthDay = new Date(nextBirthDay.setFullYear(year + 1))
  }
  // get exact next birthday
  nextBirthDay = new Date(nextBirthDay.setHours(hour, minute))

  setInterval(() => {
    document.querySelector('.until-birthday').innerText = getTimeUntilStr(
      nextBirthDay - Date.now()
    )
  }, 1000)
}
