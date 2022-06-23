const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); // For post method, req.body
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());
const fs = require('fs')


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

app.get('/', (req, res) => {
  res.sendFile(filePath)
});

const listRoute = require('./src/routes/list_route');
app.use('/list', listRoute);


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
}

const sumTest = async (a,b) => {return a+b};
// module.exports = sumTest;
module.exports = { sumTest, app };