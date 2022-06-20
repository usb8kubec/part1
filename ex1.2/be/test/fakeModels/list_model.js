let db = {
  rowCount: 3,
  rows: 
    [
      {"id":"1", "name":"fakeTask 1", "status":1},
      {"id":"2", "name":"fakeTask 2", "status":0},
      {"id":"3", "name":"fakeTask 3", "status":0}
    ]
}

module.exports = {
  get: (callback) => {
    callback(err=false, db);  // err=false --> not error at pg server
  },

  getTodoList: (callback) => {
    let dbResult = {};
    dbResult.rows = db.rows.filter(row => row.status == 0);
    // we have no emty list now --> dbResult.rowCount != 0
    callback(err=false, dbResult);
  },

  add: (name, callback) => {
    let dbResult = {}
    callback(err=false, dbResult)
  },

  update: (name, status, id, callback) => {
    let dbResult = {};
    dbResult.rowCount = 0
    for (let o of db.rows) {
      if (o.id == id) {
        dbResult.rowCount = 1;
        break
      }
    }
    callback(err=false, dbResult);
  },

  getDoneList: (callback) => {
    let dbResult = {};
    dbResult.rows = db.rows.filter(row => row.status == 0);
    callback(err=false, dbResult);
  },

  delete: (id, callback) => {
    let dbResult = {};
    dbResult.rowCount = 0
    for (let o of db.rows) {
      if (o.id == id) {
        dbResult.rowCount = 1;
        break
      }
    }
    callback(err=false, dbResult);
  },
};