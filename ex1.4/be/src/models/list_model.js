const db = require('../db.js');
const { v4: uuidv4 } = require('uuid');

const tableName = 'list';
// const tableName = (process.env.NODE_ENV == 'test') ? 'test_list' : 'list';

const list = {
  get: (callback) => {
    return db.query(
      `select * from ${tableName}`,
      callback
    );
  },

  // getById: (id, callback) => {
  //   return db.query(
  //     `select * from ${tableName} where id=$1`,
  //     [id],
  //     callback
  //   )
  // },

  getTodoList: (callback) => {
    return db.query(
      // https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
      `select * from ${tableName} where status=$1`,
      [0],
      callback
    );
  },

  add: (name, callback) => {
    return db.query(
      `insert into ${tableName} (id, name, status) values ($1, $2, $3)`,
      [uuidv4(), name, 0],
      callback
    );
  },

  update: (name, status, id, callback) => {
    return db.query(
      `update ${tableName} set name=$1, status=$2 where id=$3`,
      [name, status, id],
      callback
    );
  },

  getDoneList: (callback) => {
    return db.query(
      `select * from ${tableName} where status=$1`,
      [1],
      callback
    );
  },

  // // delete: (item, id, callback) => {
  // //   return db.query(
  // //     `delete from ${tableName} where id=$1`,
  // //     [id],
  // //     callback
  // //   );
  // // },

  delete: (id, callback) => {
    return db.query(
      `delete from ${tableName} where id=$1`,
      [id],
      callback
    );
  },
};

module.exports = list;
