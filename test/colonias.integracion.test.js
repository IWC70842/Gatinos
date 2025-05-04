const request = require('supertest');
const app = require('../app');

describe('Integración con el API Colonias',()=>{  

  test ('listado de colonias', async ()=>{
    const res = await request(app).get('/colonias');
    expect(res.statusCode).toBe(200);
  })

});