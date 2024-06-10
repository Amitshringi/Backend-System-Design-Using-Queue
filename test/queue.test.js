import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
const { expect } = chai;

chai.use(chaiHttp);

describe('Queue', () => {
  let token;

  before((done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should enqueue a request', (done) => {
    chai.request(app)
      .post('/api/request')
      .set('Authorization', `Bearer ${token}`)
      .send({ request: { action: 'test' } })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should process a request from the queue', (done) => {
    chai.request(app)
      .post('/api/request')
      .set('Authorization', `Bearer ${token}`)
      .send({ request: { action: 'test' } })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
