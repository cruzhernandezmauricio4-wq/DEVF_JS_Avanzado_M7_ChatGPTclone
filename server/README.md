# Servidor Express de DevfSeek

Back-end del clon de ChatGPT. Por ahora tiene un solo endpoint que responde "Hola Mundo".

## Instalar

```bash
cd server
npm install
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm start` | Enciende el servidor en http://localhost:8080 |
| `npm run dev` | Igual que start, pero se reinicia solo al guardar cambios |
| `npm test` | Corre las pruebas automáticas |

El puerto es 8080 porque el front-end con Vite ya usa el 3000.

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/` | `Hola Mundo` |

## Archivos

- `app.js` crea la app de Express y define las rutas.
- `server.js` enciende la app en un puerto.
- `server.test.js` prueba los endpoints con el test runner que ya trae Node.

Separar la app del arranque permite que las pruebas enciendan el servidor en un puerto libre y lo apaguen al terminar.
