/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Lógica de negocio relacionada con Colonias.
 * Interactua con coloniaRepository para las acciones del "CRUD" y maneja los posibles errores.
 */

const coloniaRepository = require("../repositories/coloniaRepository");

// Listar todas las colonias
// Llama al repositorio para obtener todas las colonias almacenadas.
exports.listarColonias = async () => {
  return await coloniaRepository.listarColonias();
};

// Recuperar una colonia por su ID
// Verifica que se haya proporcionado un ID antes de llamar al repositorio para obtener la colonia.
exports.recuperarPorId = async (id) => {
  if (!id) throw new Error('No ha llegado el id requerido');
  return await coloniaRepository.recuperarPorId(id);
};

// Crear una nueva colonia
// Verifica que se proporcionen los datos necesarios para crear una colonia antes de llamarlo en el repositorio.
exports.crearColonia = async (colonia) => {
  if (!colonia) throw new Error('Datos de colonia requeridos');
  return await coloniaRepository.crearColonia(colonia);
};

// Actualizar una colonia existente
// Verifica que se proporcionen los datos y el ID para actualizar la colonia en el repositorio.
exports.actualizarColonia = async (colonia) => {
  if (!colonia) throw new Error('Datos de colonia requeridos');
  if (!colonia.id) throw new Error('No ha llegado el id requerido');
  return await coloniaRepository.actualizarColonia(colonia);
};

// Eliminar una colonia por su ID
// Verifica que se haya proporcionado un ID antes de proceder con la eliminación en el repositorio.
exports.eliminarColonia = async (id) => {
  if (!id) throw new Error('No ha llegado el id requerido');
  return await coloniaRepository.eliminarColonia(id);
};
