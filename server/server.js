import app from "./app.js";

// Usamos 8080 porque el front-end (Vite) ya ocupa el puerto 3000
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
