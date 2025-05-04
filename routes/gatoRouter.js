/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Gestiona las rutas relacionadas con los gatos
 * Incluye rutas para las vistas de los formularios (crear/editar) y las del "CRUD" de la API de gatos.
 * Usa el controlador de gatos para ejecutar la lógica correspondiente a cada ruta
 */

const express = require('express');
const router = express.Router();
const gatoController = require('../controllers/gatoController');

// ----- Rutas de obtención -----
// Obtener un gato específico por su ID
router.get('/:id', gatoController.recuperarPorId);
// Listar todos los gatos
router.get('/', gatoController.listar);
// Listar gatos que pertenecen a una colonia específica
router.get('/colonia/:coloniaId', gatoController.listarPorColonia);

// ----- Rutas para vistas (formularios) -----
// Mostrar formulario para crear un gato en una colonia específica
router.get('/crear/:coloniaId', gatoController.mostrarFormularioCrear);
// Mostrar formulario para editar un gato existente
router.get('/editar/:id', gatoController.editarGato);

// ----- Rutas de creación y edición -----
// Crear un nuevo gato
router.post('/crear', gatoController.crear);
// Guardar los cambios realizados en la edición de un gato
router.post('/editar/:id', gatoController.guardarEdicion);
// Actualizar los datos de un gato
router.put('/:id', gatoController.actualizar);

// ----- Ruta de eliminación -----
// Eliminar un gato por su ID
router.delete('/:id', gatoController.eliminar);

module.exports = router;


