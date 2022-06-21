const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); // For post method, req.body
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());

/****************************************************/
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const listRoute = require('./src/routes/list_route');
app.use('/list', listRoute);
const connRoute = require('./src/routes/conn_route');
app.use('/conn', connRoute);

/****************************************************/
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
//   // Err1: Cannot log after tests are done. Did you forget to wait for something async in your test jest
// }); 
// // Err2: Error: listen EADDRINUSE: address already in use :::5000  // app.listen err when testing
// // https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
}

const sumTest = async (a,b) => {return a+b};
// module.exports = sumTest;
module.exports = { sumTest, app };