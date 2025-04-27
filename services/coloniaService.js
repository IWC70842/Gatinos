const coloniaRepository = require("../repositories/coloniaRepository");

exports.listarColonias = async () => {
  return await coloniaRepository.listarColonias();
};

exports.recuperarPorId = async (id) => {
  if(!id) throw new Error ('No ha llegado el id requerido');
  return await coloniaRepository.recuperarPorId(id);
};

exports.crearColonia = async (colonia) => {
  if(!colonia) throw new Error ('Datos de colonia requeridos');
  return await coloniaRepository.crearColonia(colonia);
};

exports.actualizarColonia = async (colonia) => {
  if(!colonia) throw new Error ('Datos de colonia requeridos');
  if(!colonia.id) throw new Error ('No ha llegado el id requerido');    
  return await coloniaRepository.actualizarColonia(colonia);
};

exports.eliminarColonia = async (id) => {
  if(!id) throw new Error ('No ha llegado el id requerido');
  return await coloniaRepository.eliminarColonia(id);
};
