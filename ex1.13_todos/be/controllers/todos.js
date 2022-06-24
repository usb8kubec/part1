const todosRouter = require('express').Router()

const fs = require('fs')
let savedDay = new Date().getDate()

const utils = require('../utils.js')
/* ************ CRUD ************ */
const data = require('../data.json')
const { v4: uuidv4 } = require('uuid')

todosRouter.get('/', (req, res) => {
  res.send('Hello World')
})

todosRouter.get('/list', (req, res) => {
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

todosRouter.post('/list', (req, res) => {
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

todosRouter.get('/image', async (req, res) => {
  const filePath = require('../app.js')
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

// // todosRouter.put('/todolist/:id', (req, res) => {
// todosRouter.put('/todolist', (req, res) => {  // name & status
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

// todosRouter.get('list/todos', (req, res) => {
//   const resultDb = data.wholeList.filter(item => item.status == 0)
//   if (resultDb){
//     res.json(resultDb);
//   } else {
//     res.send(`You don't have any task now`);
//   }
// })

// todosRouter.get('list/done', (req, res) => {
//   const resultDb = data.wholeList.filter(item => item.status == 1)
//   if (resultDb){
//     res.json(resultDb);
//   } else {
//     res.send(`You don't have any task done now`);
//   }
// })

module.exports = todosRouter