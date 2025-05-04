/**
 * @author Jose Antonio Pozo Gonzalez
 * @email iwc70842@educastur.es
 * @version 1.0
 * @description  Arranque del servidor HTTP de la aplicación. 
 * Carga la configuracion de EXPRESS desde app.js y levanta el servidor en el puerto especificado.
 */

// Importa la app de Express configurada
const app = require("../app");
// Crea el servidor HTTP con el módulo nativo de Nodejs
const http = require("http");

const PORT = process.env.PORT || 3000;

// Crea un servidor HTTP con la app de Express
const server = http.createServer(app);

//Arranca el servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
