const express=require('express');
const router = express.Router();

const coloniaController = require('../controllers/coloniaController');

router.get('/', coloniaController.listar);
router.post('/',coloniaController.crear);
router.get('/:id', coloniaController.recuperarPorId);
router.put('/', coloniaController.actualizar);
router.delete('/:id', coloniaController.eliminar);

module.exports = router;