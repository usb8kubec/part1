// const sumTest = require("../app.js");
const { sumTest, app } = require("../app.js");
const request = require('supertest');


describe("example", () => {
  it("example", async () => {
    expect( await sumTest(1,2) ).toBe(3);
  });
});

describe('GET /list', () => {
  it('can get', (done) => {
    request(app)
      .get('/list')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body.length).toBeGreaterThanOrEqual(3);
        done();
      })
      .catch((err) => done(err));
    // .expect(200, done)
  });

  it('can get - method await', async () => {
    const res = await request(app).get('/list')
                                  .set('Accept', 'application/json');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toEqual('object');
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });
});

describe('PUT /list/:id', () => {
  it('can put', (done) => {
    request(app)
      .put('/list/3')
      .send({ name: 'test task 3', status: 1 })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toEqual(200);
        done();
      })
      .catch((err) => done(err));
  });
  it('cannot put - with invalid id', (done) => {
    request(app)
      .put('/list/5')
      .send({ name: 'test task 5', status: 1 })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toEqual(400);
        done();
      })
      .catch((err) => done(err));
  });
  it('cannot put - with invalid name', (done) => {
    request(app)
      .put('/list/3')
      .send({ name: '', status: 1 })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toEqual(400);
        done();
      })
      .catch((err) => done(err));
  });
  it('cannot put - with invalid status', (done) => {
    request(app)
      .put('/list/3')
      .send({ name: '333333', status: 'a' })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toEqual(400);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /list', () => {
  it('can post', (done) => {
    request(app)
      .post('/list')
      .send({ name: 'test test 4' })
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).toEqual(201)
        done();
      })
      .catch(err => done(err))
  })
  it('cannot post - with invalid name', (done) => {
    request(app)
      .post('/list')
      .send({ name: '' })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toEqual(400);
        done();
      })
      .catch((err) => done(err));
  });
});

// POST create redundant data --> need deleted
const db = require('../src/db.js');
db.query("select * from test_list where name = $1", ['test test 4'])
  // .then(result => console.log(result.rows));
  .then(result => {
    if (result.rows.length != 0) {
      let newTasks = result.rows;
      for (let i in newTasks) {
        db.query("delete from test_list where id=$1", [newTasks[i].id])
      }
    }
  });



