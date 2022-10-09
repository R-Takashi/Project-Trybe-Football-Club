import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testando rota /leaderboard/home', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
  });

  it('GET - Retorna o placar geral de equipes da casa', async () => {
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys([
      'name',
      'totalPoints',
      'totalGames',
      'totalVictories',
      'totalDraws',
      'totalLosses',
      'goalsFavor',
      'goalsOwn',
      'goalsBalance',
      'efficiency']);
  });
});

describe('Testando rota /leaderboard/away', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
  });

  it('GET - Retorna o placar geral de equipes visitantes', async () => {
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys([
      'name',
      'totalPoints',
      'totalGames',
      'totalVictories',
      'totalDraws',
      'totalLosses',
      'goalsFavor',
      'goalsOwn',
      'goalsBalance',
      'efficiency']);
  });
});

describe('Testando rota /leaderboard', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');
  });

  it('GET - Retorna o placar geral de equipes', async () => {
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.all.keys([
      'name',
      'totalPoints',
      'totalGames',
      'totalVictories',
      'totalDraws',
      'totalLosses',
      'goalsFavor',
      'goalsOwn',
      'goalsBalance',
      'efficiency']);
  });
});

