const gatoRepository = require("../repositories/gatoRepository");

exports.listarGatos = async () => {
  return await gatoRepository.listarGatos();
};

exports.recuperarGatoPorId = async (id) => {
  if(!id) throw new Error ('No ha llegado el id requerido');
  return await gatoRepository.recuperarGatoPorId(id);
};

exports.crearGato = async (gato) => {
  if(!gato) throw new Error ('Datos de gato requeridos');
  return await gatoRepository.crearGato(gato);
};

exports.actualizarGato = async (gato) => {
  if(!gato) throw new Error ('Datos de gato requeridos');
  if(!gato.id) throw new Error ('No ha llegado el id requerido');    
  return await gatoRepository.actualizarGato(gato);
};

exports.eliminarColonia = async (id) => {
  if(!id) throw new Error ('No ha llegado el id requerido');
  return await gatoRepository.eliminarGato(id);
};

// Este es el servicio para obtener los gatos por colonia
exports.listarGatosPorColonia = async (coloniaId) => {
  try {
    const gatos = await gatoRepository.listarGatos(); // Traemos todos los gatos
    const gatosColonia = gatos.filter(gato => gato.colonia.id === parseInt(coloniaId));
    return gatosColonia;
  } catch (error) {
    console.error("Error al recuperar los gatos de la colonia: ", error.message);
    throw new Error("No se pudieron recuperar los gatos");
  }
};