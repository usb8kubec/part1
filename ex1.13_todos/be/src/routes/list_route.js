const express = require('express');
const router = express.Router();

// const list = require('../models/list_model');
const list = (process.env.NODE_ENV == 'test')
              ? require("../../test/fakeModels/list_model")
              : require("../models/list_model");

router.get('/', (req, res) => {
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
  res.send('Hello todos');
  // list.get((err, dbResult) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json(err); // NOTE: can find err at the "where" line or console.log(err)
  //   } else {
  //     if (dbResult.rowCount == 0) {
  //       // res.sendStatus(404); // empty list
  //       res.status(404).json(dbResult.rows);
  //     } else {
  //       res.status(200).json(dbResult.rows);
  //     }
  //   }
  // });
});

// router.get('/:id', (req, res) => {
//   list.getById(req.params.id, (err, dbResult) => {
//     if (err) {
//       res.status(500).json(err);
//     }
//     else {
//       if (dbResult.rowCount == 0) {
//         res.sendStatus(404);
//       } else {
//         res.status(200).json(dbResult.rows[0]);
//       }
//     }
//   })
// })

router.get('/todolist', (req, res) => {
  list.getTodoList((err, dbResult) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (dbResult.rowCount == 0) {
        res.status(404).json(dbResult.rows);
      } else {
        res.status(200).json(dbResult.rows);
      }
    }
  });
});

router.post('/', (req, res) => {
  let { name } = req.body;

  if (name == '') {
    res.status(400).send('Status 400 : Invalid name');
    return;
  }

  list.add(name, (err, dbResult) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // console.log(dbResult.rowCount)
      if (dbResult.rowCount == 0) {
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    }
  });
});

router.put('/:id', (req, res) => {
  let { name, status } = req.body;

  if (name == '' || typeof status != 'number') {
    res.status(400).send('Status 400 : Invalid name or status');
    return;
  }

  list.update(name, status, req.params.id, (err, dbResult) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      if (dbResult.rowCount == 0) {
        res.sendStatus(400);  // invalid id ...
      } else {
        res.sendStatus(200);
      }
    }
  });
});

router.get('/donelist', (req, res) => {
  list.getDoneList((err, dbResult) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (dbResult.rowCount == 0) {
        res.status(404).json(dbResult.rows);
      } else {
        res.status(200).json(dbResult.rows);
      }
    }
  });
});

// // router.delete("/:id", (req, res) => {
// //   list.delete(req.body, req.params.id, (err, dbResult) => {
// //     if (err) {
// //       res.status(500).json(err);
// //     }
// //     else {
// //       if (dbResult.rowCount == 0) {
// //         res.sendStatus(404);
// //       } else {
// //         res.sendStatus(200);
// //       }
// //     }
// //   })
// // })

router.delete("/:id", (req, res) => {
  list.delete(req.params.id, (err, dbResult) => {
    if (err) {
      res.status(500).json(err);
    }
    else {
      if (dbResult.rowCount == 0) {
        res.sendStatus(404); // invalid id
      } else {
        res.sendStatus(200);
      }
    }
  })
})

module.exports = router;
