/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Script que gestiona las operaciones CRUD (crear, listar, recuperar, actualizar y eliminar)
 *  para las colonias en la aplicación. Utiliza servicios (coloniaService y gatoService) para interactuar
 *  con la base de datos y realizar estas operaciones. Para cada operación, se renderiza una vista
 *  correspondiente, pasando los datos necesarios a la plantilla de Handlebars para su visualización.
 */

// Dependencias
const coloniaService = require("../services/coloniaService");
const gatoService = require("../services/gatoService");

//Listar todas las colonias.
exports.listar = async (req, res) => {
  try {
    //Recupera todas las colonias desde el servicio
    const colonias = await coloniaService.listarColonias();
    //Renderiza la vista de las colonias
    res.render('colonias/colonias', {
      title: 'Colonias',
      colonias,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al obtener colonias: ", error.message);
    res.status(500).render('500');
  }
};

// Mostrar el formulario de creación de colonia
exports.mostrarFormularioCrear = (req, res) => {
  res.render('colonias/crearColonia', {
    title: 'Crear Colonia',
    css: '<link rel="stylesheet" href="/css/colonias.css">'
  });
};

/**
 * Crear una nueva colonia.
 * Recibe los datos del formulario y crea la colonia.
 */
exports.crear = async (req, res) => {
  try {
    const datosColonia = {
      nombre: req.body.nombre,
      imagenColonia: req.body.imagenColonia,
      descripcion: req.body.descripcion,
      telefono: req.body.telefono,
      movil: req.body.movil,
      ubicacion: req.body.ubicacion,
      tamano: req.body.tamano
    };

    const resultado = await coloniaService.crearColonia(datosColonia);

    // Redirige a la lista de colonias
    res.redirect('/colonias');
  } catch (error) {
    console.error("Error al crear colonia: ", error.message);    
    res.status(500).render('500');
  }
};

/**
 * Recuperar los detalles de una colonia específica.
 * Recupera los datos de la colonia utilizando su ID y renderiza la vista con los datos de la colonia.
 */
exports.recuperarColoniaPorId = async (req, res) => {
  try {
    const detalleColonia = await coloniaService.recuperarPorId(req.params.id);
    res.render('colonias/detalleColonia', {
      title: 'Detalle de la colonia',
      detalleColonia,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al recuperar colonia: ", error.message);
    res.status(500).render('500');
  }
};

// Mostrar formulario de edición de colonia
exports.editarColonia = async (req, res) => {
  const coloniaId = req.params.id;
  try {
    const colonia = await coloniaService.recuperarPorId(coloniaId);    
    res.render('colonias/editarColonia', {
      title: `Editar colonia: ${colonia.nombre}`,
      colonia,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al obtener colonia para edición: ", error.message);
    res.status(500).render('500');
  }
};

// Guardar los cambios después de editar colonia
exports.guardarEdicion = async (req, res) => {
  const coloniaId = req.params.id;
  const { nombre, imagenColonia, descripcion, telefono, movil, ubicacion, tamano } = req.body;

  try {
    // Incluir el ID dentro del objeto que se envía al servicio
    const datosActualizados = {
      id: coloniaId,
      nombre,
      imagenColonia,
      descripcion,
      telefono,
      movil,
      ubicacion,
      tamano
    };

    // Llamar al servicio con el objeto completo
    await coloniaService.actualizarColonia(datosActualizados);

    // Redirigir a la vista de detalles de la colonia editada
    res.redirect(`/colonias/${coloniaId}`);
  } catch (error) {
    console.error("Error al guardar la edición de colonia: ", error.message);
    res.status(500).render('500');
  }
};

/**
 * Actualizar una colonia existente.
 * Recibe los datos del formulario de actualización y guarda los cambios en la colonia.
 */
exports.actualizar = async (req, res) => {
  try {
    const resultado = await coloniaService.actualizarColonia(req.body);
    res.render('colonias/crearColonias', {
      title: 'Actualizar colonia',
      resultado,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al actualizar colonia: ", error.message);
    res.status(500).render('500');
  }
};

/**
 * Eliminar una colonia.
 * Recibe el ID de la colonia y la elimina.
 */
exports.eliminar = async (req, res) => {
  try {
    await coloniaService.eliminarColonia(req.params.id);
    res.status(200).send("Colonia eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar colonia: ", error.message);
    res.status(500).render('500');
  }
};

/**
 * Recuperar los detalles de una colonia junto con los gatos pertenecientes a ella.
 * Recupera la colonia por ID y lista los gatos asociados a ella, luego renderiza la 
 * vista de detalle de la colonia.
 */
exports.recuperarDetallesColoniaConGatos = async (req, res) => {
  try {
    const idColonia = req.params.id;

    // Recuperar los datos de la colonia
    const detalleColonia = await coloniaService.recuperarPorId(idColonia);

    // Recuperar los gatos de esta colonia
    const gatos = await gatoService.listarGatosPorColonia(idColonia);

    // Renderizar la vista combinada
    res.render('colonias/detalleColonia', {
      title: 'Detalle de la colonia',
      detalleColonia,
      gatos,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });

  } catch (error) {
    console.error("Error al recuperar colonia: ", error.message);
    res.status(500).render('500');
  }
};

