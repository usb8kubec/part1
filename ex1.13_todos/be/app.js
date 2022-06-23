const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
app.use(express.json()) // For post method, req.body
app.use(express.urlencoded({ extended: false }))
const cors = require('cors')
app.use(cors())
const fs = require('fs')

/* ************ MODIFY FILE ************ */
const path = require('path')
const directory = path.join('/', 'hihi')
// const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'image.jpg')

const utils = require('./utils.js')
utils.findAFile(directory, filePath)
  .then(res => {
    if(res !== true) {
      utils.loadImage(filePath)
    }
  })
let savedDay = new Date().getDate()

/* ************ CRUD ************ */
const data = require('./data.json')
const { v4: uuidv4 } = require('uuid')

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/list', (req, res) => {
  if (utils.checkNewDay(savedDay)) {
    savedDay = new Date().getDate()
    utils.removeFile(filePath)
      .then(() => utils.findAFile(directory, filePath))
      .then(res => {
        if(res !== true) {
          utils.loadImage(filePath)
        }
      })
  }
  res.json(data.wholeList)
})

app.post('/list', (req, res) => {
  // console.log(req.body)
  data.wholeList.push({
    id: uuidv4(),
    name: req.body.name,
    status: 0,
  })
  res.send('Added')

  fs.writeFileSync('./data.json', JSON.stringify(data), function(err) {
    if(err) throw err;
  })
})

app.get('/image', async (req, res) => {
  const getFile = async () => new Promise(res => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) return console.log('FAILED TO READ FILE', '----------------', err)
      res(buffer)
    })
  })
  const dt = await getFile()
  res.contentType('image/jpeg')
  res.end(dt, 'binary')
});

// // app.put('/todolist/:id', (req, res) => {
// app.put('/todolist', (req, res) => {  // name & status
//   let obj = req.body
//   for (let i in data.wholeList) {
//     if (data.wholeList[i].id == obj.id) {
//       data.wholeList[i] = obj
//     }
//   }
//   res.send('Edited')

//   fs.writeFileSync('./data.json', JSON.stringify(data), function(err) {
//     if(err) throw err;
//   })
// })

// app.get('list/todos', (req, res) => {
//   const resultDb = data.wholeList.filter(item => item.status == 0)
//   if (resultDb){
//     res.json(resultDb);
//   } else {
//     res.send(`You don't have any task now`);
//   }
// })

// app.get('list/done', (req, res) => {
//   const resultDb = data.wholeList.filter(item => item.status == 1)
//   if (resultDb){
//     res.json(resultDb);
//   } else {
//     res.send(`You don't have any task done now`);
//   }
// })

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started in port ${port}`)
  })
}