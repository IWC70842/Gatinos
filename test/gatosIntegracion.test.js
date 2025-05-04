// Importación de dependencias
const request = require('supertest');
const app = require('../app'); 

describe('GET /gatos', () => {
  it('Listar los gatos correctamente', async () => {
    
    const response = await request(app).get('/gatos');       
    expect(response.status).toBe(200);  

  });
});