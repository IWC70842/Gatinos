const axios = require('axios');
const URL = 'http://localhost:4040';

const instance = axios.create({
  baseURL:URL
});

exports.listarColonias = async () => {
  return await instance.get('/colonias')
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al obtener colonias: ', error.message);
    throw error;
  });    
};

exports.recuperarPorId = async (id) => {
  if(!id) throw new Error ('Id requerido');
  return await instance.get(`/colonias/${id}`)
  .then(response=>response.data)
  .catch(error=>{
    console.error(`Error al obtener colonia con ID ${id}: `, error.message);
    throw error;
  });    
};

exports.crearColonia = async (colonia) => {
  if(!colonia) throw new Error ('colonia requerida');
  return await  instance.post('/colonias',colonia)
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al crear colonias: ', error.message);
    throw error;
    
  });    
};
exports.actualizarColonia = async (colonia) => {
  if(!colonia) throw new Error ('Colonia requerida');
  if(!colonia.id) throw new Error ('Id requerido');
  return await instance.put(`/colonias/${colonia.id}`, colonia)
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al actualizar colonia: ', error.message);
    throw error;
  });    
};
exports.eliminarColonia = async (id) => {
  if(!id) throw new Error ('Id requerido');
  return await instance.delete(`/colonias/${id}`)
  .then(response=>response.data)
  .catch(error=>{
    console.error('Error al eliminar colonias: ', error.message);
    throw error;
  });    
};