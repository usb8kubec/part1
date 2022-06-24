const express = require('express')
const app = express()
const port = 4001
const fs = require('fs')

const path = require('path')
// const directory = path.join('/', 'hihi')
const directory = path.join('/', 'usr', 'src', 'app', 'files')  // DONE:
const filePath = path.join(directory, 'db.json')

const utils = require('./utils.js')
utils.findAFile(directory, filePath)
  .then((res) => {
    if (res !== true) {
      let init = {
        count: 0,
        history: [{ pingpong: 0, logoutput: '' }]
      }
      fs.writeFileSync(filePath, JSON.stringify(init))
    }
  })

app.get('/pingpong', (req, res) => {
  const db = require(filePath)
  db.count += 1
  fs.writeFileSync(filePath, JSON.stringify(db))
  res.json(db.count)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})