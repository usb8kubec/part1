const express = require('express')
const app = express()
const port = 4000
const path = require('path')
const fs = require('fs')

// const directory = path.join('/', 'hihi')
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'db.txt')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const findAFile = async () => {
  if (await fileAlreadyExists()) return
  await new Promise(res => fs.mkdir(directory, (err) => res()))
}

findAFile()
  .then(() => {
    const getHashNow = () => {
      const now = new Date().toString()
      const randomHash = Math.random().toString(36).substr(2, 6)
      const data = `${now} : ${randomHash}\n`
      fs.appendFile(filePath, data, (err) => {
        if (err) throw err
      })
    
      setTimeout(getHashNow, 5000)
    }
    getHashNow()
  })


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})