const coloniaService = require("../services/coloniaService");
const gatoService = require("../services/gatoService");


exports.listar = async (req, res) => {
  try {
    const colonias = await coloniaService.listarColonias();
    //res.render('colonias/colonias',{colonias});
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

exports.eliminar = async (req, res) => {
  try {
    const resultado = await coloniaService.eliminarColonia(req.params.id); 
    res.render('colonias/borrarColonia', {
      title: 'Eliminar colonia',
      resultado,
      css: '<link rel="stylesheet" href="/css/colonias.css">'
    });
  } catch (error) {
    console.error("Error al crear colonia: ", error.message);
    res.status(500).send("Error del servidor");
  }
};

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
 