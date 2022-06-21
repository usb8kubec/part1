// const sumTest = require("../app.js");
const { sumTest, app } = require("../app.js");
const request = require('supertest');

describe("example", () => {
  it("example", async () => {
    expect( await sumTest(1,2) ).toBe(3);
  });
});

describe('CONNECTION', () => {
  it('can get time now', (done) => {
    request(app)
      .get('/conn')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(typeof res.body).toEqual('string');
        done();
      })
      .catch((err) => done(err));
  });
});



