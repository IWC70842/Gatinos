const express = require('express');
const router = express.Router();
const gatoController = require('../controllers/gatoController');

router.get('/:id', gatoController.recuperarPorId);
router.get('/', gatoController.listar);
router.get('/colonia/:coloniaId', gatoController.listarPorColonia);
router.post('/', gatoController.crear);
router.put('/:id', gatoController.actualizar);
router.delete('/:id', gatoController.eliminar);


module.exports = router;

