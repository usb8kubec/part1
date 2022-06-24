const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3001;
app.use(express.json()) // For post method, req.body
app.use(express.urlencoded({ extended: false }))
const cors = require('cors')
app.use(cors())


const path = require('path')
let directory = (process.env.NODE_ENV === 'dev')
                ? path.join('/', 'hihi')
                : path.join('/', 'haha')
                // : path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'image.jpg')

const utils = require('./utils.js')
utils.findAFile(directory, filePath)
  .then(res => {
    if(res !== true) {
      utils.loadImage(filePath)
    }
  })


const todosRouter = require('./controllers/todos')
app.use('/api', todosRouter)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started in port ${port}`)
  })
}

module.exports = filePath