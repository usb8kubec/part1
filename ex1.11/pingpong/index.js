const express = require('express')
const app = express()
const port = 4001

const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'hihi')
// const directory = path.join('/', 'usr', 'src', 'app', 'files')  // TODO:
const filePath = path.join(directory, 'db.json')

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const findAFile = async () => {
  if (await fileAlreadyExists()) return true
  await new Promise(res => fs.mkdir(directory, (err) => res()))
}

findAFile()
  .then((res) => {
    if (res !== true) {
      let init = { count: 0, log: '' }
      fs.writeFileSync(filePath, JSON.stringify(init))
    }
  })

app.get('/', (req, res) => {
  let db = require(filePath)
  db.count += 1
  fs.writeFileSync(filePath, JSON.stringify(db))
  res.json(db)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})