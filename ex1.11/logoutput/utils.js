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

module.exports = {
  fileAlreadyExists, findAFile
}