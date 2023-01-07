const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const sinon = require('sinon');
const fs = require('fs');

chai.use(chaiHttp);
const { expect } = require(chai)

const mockFile = JSON.stringify([
  {"name": "Renata Brito", "age": 17, "id": 1, "talk": { "watchedAt": "15/10/2019", "rate": 4 }},
  {"name": "Camila Santos", "age": 36, "id": 2, "talk": { "watchedAt": "22/10/2019", "rate": 4 }},
  {"name": "Ricardo Xavier Filho", "age": 33, "id": 3, "talk": { "watchedAt": "23/10/2020","rate": 5 }},
])

describe('Testando o endpoint talker', function () {
  beforeEach(function () {
    sinon.stub(fs.promises, 'readFile').resolves(mockFile)
    sinon.stub(fs.promises, 'writeFile').returns();
  })

  afterEach(function () {
    sinon.restore();
  })
  it('Testando o cadastro de talkers', function () {
    const response = chai.request(app)
      .post('/talker')
      .send({
        "name": "Test Andrade",
        "age": 25,        
        "talk": {
         "watchedAt": "23/10/2020",
         "rate": 5
        }
       })
       expect(response.status).to.equal(201);       
  })
})