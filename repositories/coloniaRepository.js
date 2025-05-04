/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Define las funciones para interactuar con en backend (Nuestra API de colonias) a traves de Axios.
 * Proporciona los metodos para el "CRUD" usando nuestra API de Colonias
 * Cada funcion maneja errores y lanza excepciones en cado de fallos.
 */

const axios = require('axios');
const URL = 'http://localhost:4040';

// Se crea una instancia de Axios con la URL base para reutilizar en todas las peticiones
const instance = axios.create({
  baseURL: URL
});

// Obtener todas las colonias disponibles desde la API
exports.listarColonias = async () => {
  return await instance.get('/colonias')
    .then(response => response.data)
    .catch(error => {
      console.error('Error al obtener colonias: ', error.message);
      throw error;
    });
};

// Recuperar una colonia específica por su ID
exports.recuperarPorId = async (id) => {
  if (!id) throw new Error('Id requerido');
  return await instance.get(`/colonias/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error al obtener colonia con ID ${id}: `, error.message);
      throw error;
    });
};

// Crear una nueva colonia enviando los datos a la API
exports.crearColonia = async (colonia) => {
  if (!colonia) throw new Error('colonia requerida');
  return await instance.post('/colonias', colonia)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al crear colonias: ', error.message);
      throw error;

    });
};

// Actualizar una colonia existente mediante su ID
exports.actualizarColonia = async (colonia) => {
  if (!colonia) throw new Error('Colonia requerida');
  if (!colonia.id) throw new Error('Id requerido');
  return await instance.put(`/colonias/${colonia.id}`, colonia)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al actualizar colonia: ', error.message);
      throw error;
    });
};

// Elimina una colonia por su ID 
exports.eliminarColonia = async (id) => {
  if (!id) throw new Error('Id requerido');
  return await instance.delete(`/colonias/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al eliminar colonias: ', error.message);
      throw error;
    });
};