const API_URL = "https://jsonplaceholder.typicode.com/posts";

const formulario = document.getElementById("form-publicacion");
const inputTitulo = document.getElementById("titulo");
const inputContenido = document.getElementById("contenido");
const botonPublicar = document.getElementById("btn-publicar");
const botonLimpiar = document.getElementById("btn-limpiar");
const estado = document.getElementById("estado");

const contadorTitulo = document.getElementById("contador-titulo");
const contadorContenido = document.getElementById("contador-contenido");
const previewTitulo = document.getElementById("preview-titulo");
const previewContenido = document.getElementById("preview-contenido");

const resultado = document.getElementById("resultado");
const resultadoId = document.getElementById("resultado-id");
const resultadoTitulo = document.getElementById("resultado-titulo");
const resultadoContenido = document.getElementById("resultado-contenido");

const datoHttp = document.getElementById("dato-http");
const datoId = document.getElementById("dato-id");

const listaHistorial = document.getElementById("lista-historial");
const contadorHistorial = document.getElementById("contador-historial");

const historial = [];

function mostrarEstado(mensaje, tipo = "") {
  estado.textContent = mensaje;
  estado.className = "estado";
  if (tipo) estado.classList.add(tipo);
}

function actualizarVistaPrevia() {
  const titulo = inputTitulo.value.trim();
  const contenido = inputContenido.value.trim();

  contadorTitulo.textContent = inputTitulo.value.length;
  contadorContenido.textContent = inputContenido.value.length;

  previewTitulo.textContent = titulo || "Tu título aparecerá aquí";
  previewContenido.textContent =
    contenido || "El contenido de tu publicación se mostrará aquí mientras escribes.";
}

function limpiarResultado() {
  resultado.classList.add("oculto");
  resultadoId.textContent = "";
  resultadoTitulo.textContent = "";
  resultadoContenido.textContent = "";
}

function mostrarResultado(datos) {
  resultadoId.textContent = datos.id ?? "No disponible";
  resultadoTitulo.textContent = datos.title ?? "No disponible";
  resultadoContenido.textContent = datos.body ?? "No disponible";
  resultado.classList.remove("oculto");
}

function actualizarHistorial() {
  contadorHistorial.textContent = historial.length;
  listaHistorial.textContent = "";

  if (historial.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.className = "vacio";
    mensaje.textContent = "Todavía no has publicado mensajes en esta sesión.";
    listaHistorial.appendChild(mensaje);
    return;
  }

  for (let i = historial.length - 1; i >= 0; i--) {
    const publicacion = historial[i];

    const item = document.createElement("article");
    item.className = "item-historial";

    const titulo = document.createElement("h3");
    titulo.textContent = publicacion.title;

    const contenido = document.createElement("p");
    contenido.textContent = publicacion.body;

    const meta = document.createElement("small");
    meta.textContent = "ID recibido: " + publicacion.id;

    item.appendChild(titulo);
    item.appendChild(contenido);
    item.appendChild(meta);
    listaHistorial.appendChild(item);
  }
}

async function publicarMensaje(publicacion) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(publicacion)
  });

  datoHttp.textContent = response.status;

  if (!response.ok) {
    throw new Error("Error HTTP: " + response.status);
  }

  return await response.json();
}

formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const titulo = inputTitulo.value.trim();
  const contenido = inputContenido.value.trim();

  limpiarResultado();
  datoHttp.textContent = "—";
  datoId.textContent = "—";

  if (titulo === "" || contenido === "") {
    mostrarEstado("Completa el título y el contenido antes de publicar.", "aviso");
    return;
  }

  const publicacion = {
    title: titulo,
    body: contenido,
    userId: 1
  };

  botonPublicar.disabled = true;
  botonLimpiar.disabled = true;
  botonPublicar.textContent = "Publicando...";
  mostrarEstado("Enviando publicación a la API...", "cargando");

  try {
    const datos = await publicarMensaje(publicacion);

    datoId.textContent = datos.id ?? "—";
    mostrarResultado(datos);
    mostrarEstado("Publicación enviada correctamente.", "exito");

    historial.push(datos);
    actualizarHistorial();

    formulario.reset();
    actualizarVistaPrevia();
  } catch (error) {
    console.error("Error al publicar:", error);
    mostrarEstado(
      "No se pudo publicar el mensaje. Revisa la conexión e inténtalo nuevamente.",
      "error"
    );
  } finally {
    botonPublicar.disabled = false;
    botonLimpiar.disabled = false;
    botonPublicar.textContent = "Publicar mensaje";
  }
});

botonLimpiar.addEventListener("click", function () {
  formulario.reset();
  limpiarResultado();
  mostrarEstado("");
  datoHttp.textContent = "—";
  datoId.textContent = "—";
  actualizarVistaPrevia();
  inputTitulo.focus();
});

inputTitulo.addEventListener("input", actualizarVistaPrevia);
inputContenido.addEventListener("input", actualizarVistaPrevia);

actualizarVistaPrevia();
actualizarHistorial();
