import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import app from "./app.js";

let server;
let baseUrl;

// Antes de las pruebas encendemos el servidor en un puerto libre (0 = el que esté disponible)
before(() => {
  server = app.listen(0);
  baseUrl = `http://localhost:${server.address().port}`;
});

// Al terminar lo apagamos
after(() => {
  server.close();
});

test("GET / responde 200 con 'Hola Mundo'", async () => {
  const res = await fetch(`${baseUrl}/`);

  assert.equal(res.status, 200);
  assert.equal(await res.text(), "Hola Mundo");
});

test("una ruta que no existe responde 404", async () => {
  const res = await fetch(`${baseUrl}/no-existe`);

  assert.equal(res.status, 404);
});
