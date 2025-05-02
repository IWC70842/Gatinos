const express=require('express');
const router = express.Router();

const coloniaController = require('../controllers/coloniaController');

// Mostrar formulario para crear colonia (GET)
router.get('/crearColonia', coloniaController.mostrarFormularioCrear);

// Rutas del API REST
router.get('/', coloniaController.listar);
router.post('/',coloniaController.crear);
router.get('/:id', coloniaController.recuperarPorId);
router.put('/', coloniaController.actualizar);
router.delete('/:id', coloniaController.eliminar);

module.exports = router;