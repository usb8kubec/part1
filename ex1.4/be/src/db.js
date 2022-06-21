// (http://expressjs.com/en/guide/database-integration.html#postgresql)
// https://node-postgres.com/features/connecting
const { Pool, Client } = require('pg');

let connection = new Pool({  // NOTE: {try, catch} is attached
  user: process.env.USER || 'postgres',
  host: process.env.HOST || 'localhost',
  password: process.env.PASSWORD || '1216',
  database: process.env.DATABASE || 'todolist',
});

/************ AUTO CREATE - ASYNC FUNCTION ************/
// connection.query("select * from test_list where name = 'test test 1'")
//           .then(result => console.log(result.rows[0]) );

// connection.query("select * from test_list where name = $1", ['test test 1'])
//           .then(result => console.log(result.rows[0]) );
// NOTE: >>> most web API-async have availabe then, catch 

const execute = async (queryContent) => {
  try {
    // await connection.query(queryContent);
    // return true;
    return connection.query(queryContent);
  } catch (error) {
    // console.error(error.stack);
    // return false;
    return error.stack;
  }
  // finally {
  //   await connection.end();
  // }
};

const execute2 = (queryContent) => {
  return new Promise((resolve, reject) => {
    connection.query(queryContent, (error, results, fields) => {
      // if (error) { return reject('Error123'); }
      if (error) { return reject(error); }
      // resolve('Success123');
      resolve(results);
    });
  });
};

/******************* AUTO CREATE *******************/
// then, catch -------------------------------------
const newTable = `
  CREATE TABLE IF NOT EXISTS public.list (
      id character varying(50) COLLATE pg_catalog."default" NOT NULL,
      name character varying(100) COLLATE pg_catalog."default" NOT NULL,
      status integer NOT NULL,
      CONSTRAINT list_pkey PRIMARY KEY (id)
  );`
// execute(newTable) 
//   .then(result => { console.log('Table created'); })
//   .catch(err => { console.log(err); })
// execute2(newTable)
//   .then(result => { console.log('Table created'); })
//   .catch(err => { console.log(err); })

// async, await ------------------------------------
// const executeAsync = async () => {
//   await execute2(newTable);
//   console.log('Table created');
// }
// executeAsync();

// We will create this when start docker -------------
// const newDb = `CREATE DATABASE auto_todos;`
// execute(newDb)
//   .then(result => { console.log('Database created'); })
//   .catch(err => { console.log(err); })

module.exports = connection;
