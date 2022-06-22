const express = require('express')
const app = express()
const port = 3000
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
    const getHashNow = () => {
      const now = new Date().toString()
      const randomHash = Math.random().toString(36).substr(2, 6)
      const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }))
      console.log(data)
      const logoutput = `${now} : ${randomHash}`
    
      if(data.count !== data.history[data.history.length - 1].pingpong) {
        data.history.push({
          pingpong: data.count,
          logoutput: logoutput
        })
        fs.writeFileSync(filePath, JSON.stringify(data))
      }
    
      setTimeout(getHashNow, 5000)
    }
    getHashNow()
  })

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }))
  res.send(data)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})