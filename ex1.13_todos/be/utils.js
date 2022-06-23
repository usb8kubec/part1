/* ********* MODIFY DIR & FILE ******* */
const fs = require('fs')

const fileAlreadyExists = async (filePath) => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const findAFile = async (directory, filePath) => {
  if (await fileAlreadyExists(filePath)) return true
  await new Promise(res => fs.mkdir(directory, (err) => res()))
}

/* ********* MODIFY IMAGE ******* */
const removeFile = async (filePath) => new Promise(res => fs.unlink(filePath, (err) => res()))

const axios = require('axios')
const loadImage = async (filePath) => {
  const response = await axios.get('https://picsum.photos/200', { responseType: 'stream' })
  response.data.pipe(fs.createWriteStream(filePath))
}

const checkClock = (hour, min, sec) => {
  const now = new Date()
  if (now.getHours() === hour &&
      now.getMinutes() === min && 
      now.getSeconds() === sec) {
    return true
  }
}

const checkNewDay = (savedDay) => {
  const now = new Date()
  if (now.getDate() !== savedDay) {
    return true
  }
}

module.exports = {
  fileAlreadyExists, findAFile, removeFile, loadImage, checkClock, checkNewDay
}