'use strict'

function makeId(length = 6) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'

  let txt = letters.charAt(Math.floor(Math.random() * letters.length))

  for (let i = 0; i < length - 1; i++) {
    txt += digits.charAt(Math.floor(Math.random() * digits.length))
  }
  return txt
}

// Padding '0' to a lonely digit.
function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

// Converts milliseconds to a readable String
function getTimeUntilStr(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  let days = Math.ceil(milliseconds / (1000 * 3600 * 24))

  seconds = seconds % 60
  minutes = minutes % 60
  hours = hours % 24

  return `${days} Days, ${padTo2Digits(hours)} Hours, ${padTo2Digits(
    minutes
  )} Minutes and ${padTo2Digits(seconds)} Seconds`
}

function getRandomIntInc(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
