/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Gestiona la ruta principal del sitio dashboard
 */

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Ruta raíz del sitio, muestra el dashboard
router.get('/', indexController.dashboard);

module.exports = router;