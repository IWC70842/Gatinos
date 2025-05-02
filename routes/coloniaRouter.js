const express = require('express');
const router = express.Router();

const coloniaController = require('../controllers/coloniaController');

// Mostrar formulario para crear colonia (GET)
router.get('/crearColonia', coloniaController.mostrarFormularioCrear);

// Mostrar formulario de edición de colonia
router.get('/editar/:id', coloniaController.editarColonia); // Ruta para obtener el formulario de edición

/// Guardar cambios después de editar colonia 
router.post('/editar/:id', coloniaController.guardarEdicion); // Ruta para guardar los cambios de la colonia

// Rutas del API REST
router.get('/', coloniaController.listar);
router.post('/', coloniaController.crear);

router.get('/:id', coloniaController.recuperarDetallesColoniaConGatos);


router.delete('/:id', coloniaController.eliminar);

module.exports = router;