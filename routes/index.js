/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Punto de entrada principal para el sistema de rutas de la aplicación.
 * Importa y conecta los routers especificos de Index, colonias y gatos.
 */

const express = require('express');
const router = express.Router();

// Ruta principal del sitio (dashboard)
const indexRouter = require('./indexRouter');
// Rutas de colonias (gestión de colonias)
const coloniaRouter = require('./coloniaRouter');
// Rutas de gatos (gestión de gatos)
const gatoRouter = require('./gatoRouter');

router.use('/', indexRouter);
router.use('/colonias', coloniaRouter);
router.use('/gatos', gatoRouter);

module.exports = router;