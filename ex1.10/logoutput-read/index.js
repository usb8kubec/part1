const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

// const filePath = './db.txt'
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'db.txt')

app.get('/', (req, res) => {
  const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
  res.send(data)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})