import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/teams.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const allTeamsMock = [
  { id: 1, teamName: 'team1'},
  { id: 2, teamName: 'team2'},
  { id: 3, teamName: 'team3'},
]

describe('Testando rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves([...allTeamsMock] as Team[]);
  });

  after(()=>{
    sinon.restore();
  })

  it('GET - Retorna todas as equipes', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    expect(chaiHttpResponse.body[2].teamName).to.equal('team3');
  });
});

describe('Testando rota /teams:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves({...allTeamsMock[0]} as Team);
  });

  after(()=>{
    sinon.restore();
  })

  it('GET - Retorna uma equipe', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('teamName');
    expect(chaiHttpResponse.body.teamName).to.equal('team1');
  });
});

describe('Testando rota /teams/:id', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves();
  });

  after(()=>{
    sinon.restore();
  })

  it('GET - Retorna mensagem de erro quando id não existe', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/4');
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});