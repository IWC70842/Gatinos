const express = require('express');
const router = express.Router();

const indexRouter = require('./indexRouter');
const coloniaRouter = require ('./coloniaRouter');
const gatoRouter = require('./gatoRouter');

router.use('/', indexRouter);
router.use('/colonias', coloniaRouter);
router.use('/gatos', gatoRouter);

module.exports = router;