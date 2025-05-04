/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Lógica de negocio relacionada con Colonias.
 * Interactua con gatoRepository para las acciones del "CRUD" y maneja los posibles errores.
 * También maneja el procesamiento adicional, como ordenar por salud y asignar clases CSS según el estado de salud de los gatos
 */

const gatoRepository = require("../repositories/gatoRepository");

// Listar todos los gatos y clasificarlos según su estado de salud
// Filtra los gatos activos (sin fecha de salida) y eliminados (con fecha de salida), luego los clasifica por salud.
exports.listarGatos = async () => {
  const gatos = await gatoRepository.listarGatos();

  const ordenSalud = {
    'GRAVE': 0,
    'REGULAR': 1,
    'SANO': 2
  };

  // Asigna clases CSS y iconos para cada gato en función de su salud y CER
  const gatosConClase = gatos.map(gato => {
    let saludClase = '';
    switch (gato.salud) {
      case 'GRAVE':
        saludClase = 'salud-roja';
        break;
      case 'REGULAR':
        saludClase = 'salud-naranja';
        break;
      case 'SANO':
        saludClase = 'salud-verde';
        break;
    }

    const cerIcono = gato.cer
      ? 'icono-verde fas fa-check-circle'
      : 'icono-rojo fas fa-times-circle';

    return {
      ...gato,
      saludClase,
      cerIcono
    };
  });

  // Filtra y clasifica los gatos según su salud y fecha de salida
  const gatosActivos = gatosConClase
    .filter(gato => gato.fechaSalida === null)
    .sort((a, b) => ordenSalud[a.salud] - ordenSalud[b.salud]);

  const gatosEliminados = gatosConClase
    .filter(gato => gato.fechaSalida !== null);

  return {
    gatosActivos,
    gatosEliminados
  };
};

// Recuperar un gato por su ID
// Verifica que el ID esté presente y luego lo recupera del repositorio.
exports.recuperarGatoPorId = async (id) => {
  if (!id) throw new Error('No ha llegado el id requerido');
  return await gatoRepository.recuperarGatoPorId(id);
};

// Crear un nuevo gato
// Verifica que los datos del gato estén presentes antes de crear el registro en el repositorio.
exports.crearGato = async (gato) => {
  if (!gato) throw new Error('Datos de gato requeridos');
  return await gatoRepository.crearGato(gato);
};

// Actualizar un gato existente
// Verifica que los datos y el ID del gato estén presentes antes de realizar la actualización.
exports.actualizarGato = async (gato) => {
  if (!gato) throw new Error('Datos de gato requeridos');
  if (!gato.id) throw new Error('No ha llegado el id requerido');
  return await gatoRepository.actualizarGato(gato);
};

// Eliminar un gato por su ID
// Verifica que el ID esté presente y luego llama al repositorio para eliminarlo(borrado lógico)
exports.eliminarGato = async (id) => {
  if (!id) throw new Error('No ha llegado el id requerido');
  return await gatoRepository.eliminarGato(id);
};

// Obtener los gatos pertenecientes a una colonia específica
// Filtra los gatos por la colonia y por su estado activo (fechaSalida nula), luego los ordena por salud.
exports.listarGatosPorColonia = async (coloniaId) => {
  try {
    const gatos = await gatoRepository.listarGatos();

    // Filtramos los gatos por colonia y fechaSalida == null
    const gatosColonia = gatos
      .filter(gato => gato.colonia.id === parseInt(coloniaId) && gato.fechaSalida === null);

    // Ordenamos los gatos por salud
    const ordenSalud = {
      'GRAVE': 0,
      'REGULAR': 1,
      'SANO': 2
    };

    const gatosColoniaOrdenados = gatosColonia.sort((a, b) => ordenSalud[a.salud] - ordenSalud[b.salud]);

    // Añadimos la clase CSS de salud para Handlebars
    const gatosConClase = gatosColoniaOrdenados.map(gato => {
      let saludClase = '';
      switch (gato.salud) {
        case 'GRAVE':
          saludClase = 'salud-roja';
          break;
        case 'REGULAR':
          saludClase = 'salud-naranja';
          break;
        case 'SANO':
          saludClase = 'salud-verde';
          break;
      }

      // ICONO PARA EL CER
      const cerIcono = gato.cer
        ? 'icono-verde fas fa-check-circle'
        : 'icono-rojo fas fa-times-circle';

      // Creamos el nuevo objeto añadiendole la nueva propiedad
      return {
        ...gato,
        saludClase,
        cerIcono
      };
    });

    return gatosConClase;
  } catch (error) {
    console.error("Error al recuperar los gatos de la colonia: ", error.message);
    throw new Error("No se pudieron recuperar los gatos");
  }
};

// Guardar la edición de un gato
// Actualiza los detalles del gato, y maneja los errores en caso de fallo.
exports.guardarEdicion = async (gato) => {
  try {
    return await gatoRepository.actualizarGato(gato);
  } catch (error) {
    console.error("Error al actualizar el gato: ", error.message);
    throw new Error("No se pudo actualizar el gato");
  }
};
