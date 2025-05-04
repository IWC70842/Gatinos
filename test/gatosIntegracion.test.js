// Importación de dependencias
const request = require('supertest');
const app = require('../app');

// Datos de prueba
const mockGato = require('../data/gato.json');


describe('Integración /gatos métodos GET, PUT y DELETE', () => {

  test('GET /gatos - Listar todos los gatos', async () => {
    const response = await request(app).get('/gatos');
    expect(response.status).toBe(200);
  });

  test('GET /gatos/:id - Recuperar gato por ID', async () => {
    const response = await request(app).get(`/gatos/${mockGato.id}`);
    expect(response.status).toBe(200);
  });

  test('PUT /gatos/:id - Actualizar un gato existente', async () => {
    const gatoActualizado = { ...mockGato, colores: 'Gris perla' };

    const response = await request(app)
      .put(`/gatos/${mockGato.id}`)
      .send(gatoActualizado);

    expect(response.status).toBe(200);    
  });

  test('DELETE /gatos/:id - Eliminar un gato existente', async () => {
    const response = await request(app).delete(`/gatos/${mockGato.id}`);
    expect(response.status).toBe(200);
  });

});