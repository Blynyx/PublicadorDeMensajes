# Publicador de mensajes — versión mejorada

Miniaplicación para publicar mensajes en JSONPlaceholder usando JavaScript asíncrono, Fetch API, POST y DOM.

## Funcionalidad principal
- Formulario con título y contenido.
- Validación con trim().
- Petición POST a JSONPlaceholder.
- `Content-Type: application/json`.
- `JSON.stringify()` para enviar el cuerpo.
- `async/await`.
- Verificación con `response.ok`.
- `response.json()`.
- `try/catch/finally`.
- Estado de carga y botón deshabilitado.
- Resultado mostrado en el DOM mediante `textContent`.

## Mejoras incluidas
- Vista previa en tiempo real.
- Contadores de caracteres.
- Botón para limpiar.
- Estado técnico con código HTTP e ID devuelto.
- Historial de publicaciones de la sesión.
- Interfaz responsive.

## Nota
JSONPlaceholder simula la creación de publicaciones. La respuesta puede ser satisfactoria, pero no implica almacenamiento persistente.
