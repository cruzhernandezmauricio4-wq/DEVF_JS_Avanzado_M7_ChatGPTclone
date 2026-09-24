import express from "express";

// La app de Express: aquí se definen las rutas (endpoints).
// Está separada de server.js para poder probarla sin encender el servidor.
const app = express();

// GET / -> responde con el texto "Hola Mundo"
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

export default app;
