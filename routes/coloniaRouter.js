/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Gestion de las rutas relacionadas con Colonias.
 * Incluye rutas para mostrar formularios y las del "CRUD" de la API Colonias
 * Usa el Controlador de colonias para manejar la lógica asociada a cada endpoint.
 */

const express = require('express');
const router = express.Router();

const coloniaController = require('../controllers/coloniaController');

// ----- Rutas para vistas (formularios) -----
// Mostrar formulario para crear colonia 
router.get('/crearColonia', coloniaController.mostrarFormularioCrear);

// Mostrar formulario de edición de colonia
router.get('/editar/:id', coloniaController.editarColonia);

/// Guardar cambios después de editar colonia 
router.post('/editar/:id', coloniaController.guardarEdicion); 

// ----- Rutas del API REST -----
// Obtener la lista de todas las colonias
router.get('/', coloniaController.listar);
// Crear una nueva colonia
router.post('/', coloniaController.crear);
// Obtener los detalles de una colonia específica junto con sus gatos
router.get('/:id', coloniaController.recuperarDetallesColoniaConGatos);
// Eliminar una colonia por su ID
router.delete('/:id', coloniaController.eliminar);

module.exports = router;