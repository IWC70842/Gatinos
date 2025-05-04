/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Define las funciones para interactuar con en backend (Nuestra API de Gatos) a traves de Axios.
 * Proporciona los metodos para el "CRUD" usando nuestra API de Gatos
 * Cada funcion maneja errores y lanza excepciones en cado de fallos.
 */

const axios = require('axios');
const URL = 'http://localhost:4040';

// Se crea una instancia de Axios con la URL base para reutilizarla en todas las solicitudes
const instance = axios.create({
  baseURL: URL
});

// Obtener la lista de todos los gatos desde la API
exports.listarGatos = async () => {
  return await instance.get('/gatos')
    .then(response => response.data)
    .catch(error => {
      console.error('Error al obtener gatos: ', error.message);
      throw error;
    });
};

// Recuperar un gato específico por su ID
exports.recuperarGatoPorId = async (id) => {
  if (!id) throw new Error('Id requerido');
  return await instance.get(`/gatos/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error al obtener gato con ID ${id}: `, error.message);
      throw error;
    });
};

// Crear un nuevo gato enviando su información a la API
exports.crearGato = async (gato) => {
  if (!gato) throw new Error('gato requerido');
  return await instance.post('/gatos', gato)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al crear gato: ', error.message);
      throw error;

    });
};

// Actualizar los datos de un gato existente usando su ID
exports.actualizarGato = async (gato) => {
  if (!gato) throw new Error('Gato requerido');
  if (!gato.id) throw new Error('Id requerido');
  return await instance.put(`/gatos/${gato.id}`, gato)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al actualizar gato: ', error.message);
      throw error;
    });
};

// Elimina un gato por su ID (borrado lógico en nuestro caso).
exports.eliminarGato = async (id) => {
  if (!id) throw new Error('Id requerido');
  return await instance.delete(`/gatos/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al eliminar gato: ', error.message);
      throw error;
    });
};