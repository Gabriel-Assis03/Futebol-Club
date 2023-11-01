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

  it('post /teams', async function () {
    const httpResponse = await chai.request(app).get('/teams');

    expect(httpResponse.status).to.equal(200);
    // expect(httpResponse.body).to.be.deep.equal({
    //   message: "\"name\" is required"
    // });
  });

});
