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
    res.status(500).send("Error del servidor");
  }
};

/**
 * Crear una nueva colonia.
 * Recibe los datos del formulario, crea la colonia y luego muestra la vista de creación de colonia.
 */
exports.crear = async (req, res) => {
  try {
    const resultado = await coloniaService.crearColonia(req.body);
    res.render('colonias/crearColonias', {
      title: 'Creacion de colonias',
      resultado,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al crear colonia: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

/**
 * Recuperar los detalles de una colonia específica.
 * Recupera los datos de la colonia utilizando su ID y renderiza la vista con los datos de la colonia.
 */
exports.recuperarPorId = async (req, res) => {
  try {
    const detalleColonia = await coloniaService.recuperarPorId(req.params.id);    
    res.render('colonias/detalleColonia', {
      title: 'Detalle de la colonia',
      detalleColonia,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al crear colonia: ", error.message);
    res.status(500).send("Error del servidor");
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
    console.error("Error al crear colonia: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

/**
 * Eliminar una colonia.
 * Recibe el ID de la colonia y la elimina, mostrando la vista de confirmación de eliminación.
 */
exports.eliminar = async (req, res) => {
  try {
    const resultado = await coloniaService.eliminarColonia(req.params.id); 
    res.render('colonias/borrarColonia', {
      title: 'Eliminar colonia',
      resultado,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al eliminar colonia: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

/**
 * Recuperar los detalles de una colonia junto con los gatos pertenecientes a ella.
 * Recupera la colonia por ID y lista los gatos asociados a ella, luego renderiza la 
 * vista de detalle de la colonia.
 */
exports.recuperarPorId = async (req, res) => {
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
    res.status(500).send("Error del servidor");
  }
};
 