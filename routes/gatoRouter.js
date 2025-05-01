const express = require('express');
const router = express.Router();
const gatoController = require('../controllers/gatoController');

router.get('/', gatoController.listar);
router.get('/colonia/:coloniaId', gatoController.listarPorColonia);
router.get('/:id', gatoController.recuperarPorId);
router.post('/', gatoController.crear);
router.put('/:id', gatoController.actualizar);
router.delete('/:id', gatoController.eliminar);

module.exports = router;

