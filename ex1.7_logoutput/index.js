// const getHashNow = () => {
//   const now = new Date().toString()
//   const randomHash = Math.random().toString(36).substr(2, 6)

//   console.log(new Date().toString(), ': ', randomHash)

//   setTimeout(getHashNow, 5000)
// }

// getHashNow()

const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  const now = new Date().toString()
  const randomHash = Math.random().toString(36).substr(2, 6)
  res.send(`${now} : ${randomHash}`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})