const app = require("../app");
const http = require("http");

const PORT = process.env.PORT || 3000;

// Crea un servidor HTTP con la app de Express
const server = http.createServer(app);

//Arranca el servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
