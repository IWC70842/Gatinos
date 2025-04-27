const express = require('express');
const router = express.Router();

const indexRouter = require('./indexRouter');
const coloniaRouter = require ('./coloniaRouter');

router.use('/', indexRouter);
router.use('/colonias', coloniaRouter);

module.exports = router;