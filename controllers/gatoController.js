const gatoService = require("../services/gatoService");

exports.listar = async (req, res) => {
  try {
    const { gatosActivos, gatosEliminados } = await gatoService.listarGatos();
    res.render('gatos/gatos', {
      title: 'Gatos',
      gatosActivos,
      gatosEliminados,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al obtener gatos: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

exports.crear = async (req, res) => {
  try {
    const resultado = await gatoService.crearGato(req.body);
    res.render('gatos/crearGato', {
      title: 'Crear gato',
      resultado,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al crear gato: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

exports.recuperarPorId = async (req, res) => {
  try {
    const detalleGato = await gatoService.recuperarGatoPorId(req.params.id);
    res.render('gatos/detalleGato', {
      title: 'Detalle del gato',
      detalleGato,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al recuperar gato: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

exports.actualizar = async (req, res) => {
  try {
    const resultado = await gatoService.actualizarGato(req.body);
    res.render('gatos/crearGato', {
      title: 'Actualizar gato',
      resultado,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al actualizar gato: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

exports.eliminar = async (req, res) => {
  try {
    const resultado = await gatoService.eliminarGato(req.params.id);
    res.status(200).json({ mensaje: 'Gato eliminado', resultado });
  } catch (error) {
    console.error("Error al eliminar gato: ", error.message);
    res.status(500).json({ error: 'Hubo un error al eliminar el gato' });
  }
};

/**
 * Método para obtener todos los gatos de una colonia específica
 */
exports.listarPorColonia = async (req, res) => {
  try {
    // Paso 1: Obtener el coloniaId desde los parámetros de la URL
    const coloniaId = req.params.coloniaId;

    // Paso 2: Llamar al servicio para obtener los gatos de la colonia
    const gatos = await gatoService.listarGatosPorColonia(coloniaId);

    // Paso 3: Pasar los gatos filtrados y ordenados a la vista
    res.render('colonias/colonia', {
      title: 'Gatos de la colonia',
      gatos: gatos,  // Aquí pasamos la lista de gatos ordenados
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });

  } catch (error) {
    console.error("Error al obtener gatos de la colonia: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

exports.editarGato = async (req, res) => {
  try {
    const detalleGato = await gatoService.recuperarGatoPorId(req.params.id); // Recuperar gato por ID
    res.render('gatos/editarGato', {
      title: 'Editar gato',
      detalleGato,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al recuperar gato para edición: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

exports.guardarEdicion = async (req, res) => {
  try {
    const id = req.params.id; // ID del gato
    const {      
      imagenGato,
      edadAproximada,
      raza,
      colores,
      sexo,
      pelaje,
      tamano,
      vacunado,
      cer,
      fechaEntrada,
      fechaSalida,
      motivoEntrada,
      motivoSalida,
      'colonia.id': coloniaId
    } = req.body;
    
    let estadoSalud = 'GRAVE';
    if (vacunado === 'true' || cer === 'true') estadoSalud = 'REGULAR';
    if (vacunado === 'true' && cer === 'true') estadoSalud = 'SANO';
    // Asegurarnos de incluir el id junto con los otros datos
    const gato = {
      id: parseInt(id),
      imagenGato,
      edadAproximada: parseInt(edadAproximada),
      raza,
      colores,
      sexo,
      pelaje,
      tamano,
      vacunado,
      cer,
      salud: estadoSalud,
      fechaEntrada,
      fechaSalida: fechaSalida || null,
      motivoEntrada,
      motivoSalida: motivoSalida || null,
      colonia: {
        id: parseInt(coloniaId)
      }
    };

    // Llamamos al servicio para guardar la edición
    await gatoService.guardarEdicion(gato);

    res.redirect(`/gatos/${id}`); // Redirigir a la vista de detalle del gato
  } catch (error) {
    console.error("Error al guardar los cambios del gato: ", error.message);
    res.status(500).send("Error del servidor");
  }
};