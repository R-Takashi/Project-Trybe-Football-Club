import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/user.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  email: 'user@user.com',
  password: bcrypt.hashSync('secret_user'),
}

const userRoleMock = {
  role: 'user',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0OTk2OTYyLCJleHAiOjE2NjUwODMzNjJ9.RFTRyjE3vh-0iGCeJX7yiEhSA3_I-6tzSfrg5xkOdoI';

describe('Testando rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...userMock,
      } as User);
  });

  after(()=>{
    sinon.restore();
  })

  it('POST - Retorna token quando inserido dados corretamente', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: userMock.email,
      password: 'secret_user',
    });
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('POST - Retorna mensagem de erro quando inserido "email" incorretamente', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@use.com',
      password: 'secret_user',
    });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('POST - Retorna mensagem de erro quando inserido "password" incorretamente', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: userMock.email,
      password: 'wrong_password',
    });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('POST - Retorna mensagem de erro quando não é inserido "email"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      password: 'wrong_password',
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
  })

  it('POST - Retorna mensagem de erro quando não é inserido "password"', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: userMock.email,
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});

describe('Testando rota /login/validate', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...userRoleMock,
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('GET - Retorna "role", quando autenticado com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', token);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('role');
  });

  it('GET - Retorna mensagem de erro, quando token é invalido', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', 'invalid_token');
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
  
  it('GET - Retorna mensagem de erro, quando não há token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate');
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});
