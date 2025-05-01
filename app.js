const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');

const app = express();

// helpers para Handlebars
const helpers = {
  eq: (a, b) => a === b
};

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Configurar Handlebars como motor de plantillas
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  helpers: helpers 
}));
app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));

// Archivos estáticos (CSS, JS frontend, imagenes)
app.use(express.static(path.join(__dirname,'public')));

// Cargar las rutas de index.js
app.use('/',routes);

module.exports = app;
