import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
// import express from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  // const req = {} as express.Request;
  // const res = {} as express.Response;

  beforeEach(function () {
    // res.status = sinon.stub().returns(res);
    // res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('post /login', async function () {
    const body = {
      password: '123456',
      email: '',
    };
    const httpResponse = await chai.request(app).post('/login').send(body);

    expect(httpResponse.status).to.equal(400);
  });

  it('post /login', async function () {
    const body = {
      password: '',
      email: 'asd@asd.com',
    };
    const httpResponse = await chai.request(app).post('/login').send(body);

    expect(httpResponse.status).to.equal(400);
  });

  it('post /login', async function () {
    const body = {
      password: '123456',
      email: 'asd@asd.com',
    };
    const httpResponse = await chai.request(app).post('/login').send(body);

    expect(httpResponse.status).to.equal(401);
  });

  it('post /login', async function () {
    const body = {
      password: '123',
      email: 'asd@asd.com',
    };
    const httpResponse = await chai.request(app).post('/login').send(body);

    expect(httpResponse.status).to.equal(401);
  });

  it('post /login', async function () {
    const body = {
      password: '123456',
      email: 'asdasd.com',
    };
    const httpResponse = await chai.request(app).post('/login').send(body);

    expect(httpResponse.status).to.equal(401);
  });

});
