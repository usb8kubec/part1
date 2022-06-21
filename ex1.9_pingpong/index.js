// const getHashNow = () => {
//   const now = new Date().toString()
//   const randomHash = Math.random().toString(36).substr(2, 6)

//   console.log(new Date().toString(), ': ', randomHash)

//   setTimeout(getHashNow, 5000)
// }

// getHashNow()

const express = require('express')
const app = express()
const port = 4001

const fs = require('fs')

app.get('/', (req, res) => {
  // let a = {count: 0 }
  // fs.writeFileSync("./db.json", JSON.stringify(a))

  let db = require("./db.json")
  db.count += 1
  fs.writeFileSync("./db.json", JSON.stringify(db))

  res.send(`pong ${db.count}`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})