const express = require('express');
const router = express.Router();

const db = require('../db.js')

router.get('/', (req, res) => {
  db.query('select now()', (err, dbResult) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(dbResult.rows[0].now);
    }
  });
});

module.exports = router;
