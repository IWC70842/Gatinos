const axios = require('axios');
const URL = 'http://localhost:4040';

const instance = axios.create({
  baseURL:URL
});

exports.listarGatos = async () => {
  return await instance.get('/gatos')
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al obtener gatos: ', error.message);
    throw error;
  });    
};

exports.recuperarGatoPorId = async (id) => {
  if(!id) throw new Error ('Id requerido');
  return await instance.get(`/gatos/${id}`)
  .then(response=>response.data)
  .catch(error=>{
    console.error(`Error al obtener gato con ID ${id}: `, error.message);
    throw error;
  });    
};

exports.crearGato = async (gato) => {
  if(!gato) throw new Error ('gato requerido');
  return await  instance.post('/gatos',gato)
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al crear gato: ', error.message);
    throw error;
    
  });    
};
exports.actualizarGato = async (gato) => {
  if(!gato) throw new Error ('Gato requerido');
  if(!gato.id) throw new Error ('Id requerido');
  return await instance.put('/gatos', gato)
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al actualizar gato: ', error.message);
    throw error;
  });    
};
exports.eliminarGato = async (id) => {
  if(!id) throw new Error ('Id requerido');
  return await instance.delete(`/gatos/${id}`)
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al eliminar gato: ', error.message);
    throw error;
  });    
};