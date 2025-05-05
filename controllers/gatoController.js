/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Script que maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) 
 * para la gestión de gatos en la aplicación, organizadas en distintas funciones. Utiliza un 
 * servicio (gatoService) para la lógica de negocio relacionada con los gatos. Cada función 
 * corresponde a una acción (listar gatos, crear gato, editar gato, etc.) y maneja la 
 * interacción con la base de datos o la lógica necesaria para realizar la operación. 
 * Las vistas se renderizan con Handlebars y se pasan datos como parámetros a través de la respuesta.
 */

const gatoService = require("../services/gatoService");

// Controlador para listar todos los gatos activos y eliminados
exports.listar = async (req, res) => {
  try {
    // Obtiene los gatos activos y eliminados desde el servicio
    const { gatosActivos, gatosEliminados } = await gatoService.listarGatos();
    // Renderiza la vista de gatos y pasa los gatos activos y eliminados
    res.render('gatos/gatos', {
      title: 'Gatos',
      gatosActivos,
      gatosEliminados,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al obtener gatos: ", error.message);
    res.status(500).render('500');    
  }
};

// Controlador para mostrar el formulario de creación de un nuevo gato
exports.mostrarFormularioCrear = (req, res) => {
  const coloniaId = req.params.coloniaId;
  // Renderiza el formulario de creación de un gato, pasando el ID de la colonia
  res.render('gatos/crearGato', {
    title: 'Registrar nuevo gato',
    coloniaId: coloniaId,
    css: '<link rel="stylesheet" href="/css/gatos.css">'
  });
};

// Controlador para crear un nuevo gato
exports.crear = async (req, res) => {
  try {
    // Desestructura los valores del formulario
    const { colonia, edadAproximada, raza, colores, sexo, pelaje, tamano, salud, vacunado, cer, fechaEntrada, motivoEntrada, imagenGato } = req.body;
   // Calcula el estado de salud del gato en base a los datos proporcionados
    let estadoSalud = 'GRAVE';
    if (vacunado === 'true' || cer === 'true') estadoSalud = 'REGULAR';
    if (vacunado === 'true' && cer === 'true') estadoSalud = 'SANO';

    // Estructura el nuevo gato con los datos del formulario
    const nuevoGato = {
      colonia: {
        id: colonia.id
      },
      edadAproximada,
      raza,
      colores,
      sexo,
      pelaje,
      tamano,
      salud: estadoSalud,
      vacunado,
      cer,
      fechaEntrada,
      motivoEntrada,
      imagenGato
    };

    // Llamada al servicio para guardar el gato en la base de datos
    const resultado = await gatoService.crearGato(nuevoGato);

    // Redirigir a la página de detalles de la colonia
    res.redirect(`/colonias/${colonia.id}`);

  } catch (error) {
    console.error("Error al crear el gato:", error.message);
    res.status(500).render('500');
  }
};

// Controlador para mostrar los detalles de un gato por su ID
exports.recuperarPorId = async (req, res) => {
  try {
    // Obtiene los detalles del gato desde el servicio
    const detalleGato = await gatoService.recuperarGatoPorId(req.params.id);
    // Renderiza la vista de detalle del gato y pasa los datos del gato
    res.render('gatos/detalleGato', {
      title: 'Detalle del gato',
      detalleGato,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al recuperar gato: ", error.message);
    res.status(500).render('500');
  }
};

// Controlador para actualizar la información de un gato
exports.actualizar = async (req, res) => {
  try {
    // Llama al servicio para actualizar la información del gato
    const resultado = await gatoService.actualizarGato(req.body);
    // Renderiza el formulario con los datos actualizados
    res.render('gatos/crearGato', {
      title: 'Actualizar gato',
      resultado,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al actualizar gato: ", error.message);
    res.status(500).render('500');
  }
};

// Controlador para eliminar un gato
exports.eliminar = async (req, res) => {
  try {
    // Llama al servicio para eliminar el gato por ID
    const resultado = await gatoService.eliminarGato(req.params.id);
    res.status(200).json({ mensaje: 'Gato eliminado', resultado });
  } catch (error) {
    console.error("Error al eliminar gato: ", error.message);
    //res.status(500).json({ error: 'Hubo un error al eliminar el gato' });
    res.status(500).render('500');
  }
};


//Método para obtener todos los gatos de una colonia específica
exports.listarPorColonia = async (req, res) => {
  try {
    // Obtiene el ID de la colonia desde los parámetros de la URL
    const coloniaId = req.params.coloniaId;

     // Llama al servicio para obtener los gatos de la colonia
    const gatos = await gatoService.listarGatosPorColonia(coloniaId);

    // Renderiza la vista de la colonia con los gatos listados
    res.render('colonias/colonia', {
      title: 'Gatos de la colonia',
      gatos: gatos,  
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });

  } catch (error) {
    console.error("Error al obtener gatos de la colonia: ", error.message);
    res.status(500).render('500');
  }
};

// Controlador para mostrar el formulario de edición de un gato
exports.editarGato = async (req, res) => {
  try {
    // Obtiene los detalles del gato por ID
    const detalleGato = await gatoService.recuperarGatoPorId(req.params.id); 
    // Renderiza el formulario de edición con los datos del gato
    res.render('gatos/editarGato', {
      title: 'Editar gato',
      detalleGato,
      css: '<link rel="stylesheet" href="/css/gatos.css">'
    });
  } catch (error) {
    console.error("Error al recuperar gato para edición: ", error.message);
    res.status(500).render('500');
  }
};

// Controlador para guardar los cambios de un gato editado
exports.guardarEdicion = async (req, res) => {
  try {
    const id = req.params.id; // ID del gato a actualizar
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

    // Recalcula el estado de salud
    let estadoSalud = 'GRAVE';
    if (vacunado === 'true' || cer === 'true') estadoSalud = 'REGULAR';
    if (vacunado === 'true' && cer === 'true') estadoSalud = 'SANO';
    
    // Estructura del gato editado
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
    
    // Redirige a la vista del gato actualizado
    res.redirect(`/gatos/${id}`); // Redirigir a la vista de detalle del gato
  } catch (error) {
    console.error("Error al guardar los cambios del gato: ", error.message);
    res.status(500).render('500');
  }
};