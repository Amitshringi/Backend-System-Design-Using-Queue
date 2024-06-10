import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
const { expect } = chai;

chai.use(chaiHttp);

describe('Auth', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should not register an existing user', (done) => {
    chai.request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should login the user', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not login with invalid credentials', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
