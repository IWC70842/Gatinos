const gatoRepository = require("../repositories/gatoRepository");

exports.listarGatos = async () => {
  const gatos = await gatoRepository.listarGatos();

  const ordenSalud = {
    'GRAVE': 0,
    'REGULAR': 1,
    'SANO': 2
  };

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

exports.recuperarGatoPorId = async (id) => {
  if (!id) throw new Error('No ha llegado el id requerido');
  return await gatoRepository.recuperarGatoPorId(id);
};

exports.crearGato = async (gato) => {
  if (!gato) throw new Error('Datos de gato requeridos');
  return await gatoRepository.crearGato(gato);
};

exports.actualizarGato = async (gato) => {
  if (!gato) throw new Error('Datos de gato requeridos');
  if (!gato.id) throw new Error('No ha llegado el id requerido');
  return await gatoRepository.actualizarGato(gato);
};

exports.eliminarGato = async (id) => {
  if (!id) throw new Error('No ha llegado el id requerido');
  return await gatoRepository.eliminarGato(id);
};

// Servicio para obtener los gatos por colonia
exports.listarGatosPorColonia = async (coloniaId) => {
  try {
    const gatos = await gatoRepository.listarGatos(); // Traemos todos los gatos

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

exports.guardarEdicion = async (gato) => {
  try {
    return await gatoRepository.actualizarGato(gato);
  } catch (error) {
    console.error("Error al actualizar el gato: ", error.message);
    throw new Error("No se pudo actualizar el gato");
  }
};
