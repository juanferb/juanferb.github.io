// Variables globales
let juegoActual = null;

// Imágenes reales de gatos con pelaje
const gatosConPelo = [
  "images/gatos-con-pelo/gato1.jpg",
  "images/gatos-con-pelo/gato2.jpg",
  "images/gatos-con-pelo/gato3.jpg",
  "images/gatos-con-pelo/gato4.jpg",
  "images/gatos-con-pelo/gato5.jpg",
  "images/gatos-con-pelo/gato6.jpg",
  "images/gatos-con-pelo/gato7.jpg",
  "images/gatos-con-pelo/gato8.jpg",
  "images/gatos-con-pelo/gato9.jpg",
  "images/gatos-con-pelo/gato10.jpg",
];

// Imágenes reales de gatos sin pelaje (esfinge)
const gatosCalvos = [
  "images/gatos-calvos/calvo1.jpg",
  "images/gatos-calvos/calvo2.jpg",
  "images/gatos-calvos/calvo3.jpg",
];

let datos = {
  memoria: {
    cartas: [],
    volteadas: [],
    acertadas: [],
    intentos: 0,
  },
  adivinanza: {
    preguntas: [
      {
        imagen: "🐈",
        pregunta: "¿Cuál es la raza más pequeña de gato?",
        opciones: ["Singapura", "Munchkin", "Devon Rex", "Korat"],
        respuesta: "Singapura",
      },
      {
        imagen: "😸",
        pregunta: "¿Qué gato es conocido por tener orejas muy grandes?",
        opciones: ["Bengalí", "Siberiano", "Abisinio", "Persa"],
        respuesta: "Abisinio",
      },
      {
        imagen: "🐱",
        pregunta: "¿Cuál gato tiene el pelaje más suave y largo?",
        opciones: ["Siamés", "Persa", "Maine Coon", "Esfinge"],
        respuesta: "Persa",
      },
      {
        imagen: "😹",
        pregunta: "¿Cuál raza de gato no tiene pelaje?",
        opciones: ["Esfinge", "Bengalí", "Korat", "Tonquinés"],
        respuesta: "Esfinge",
      },
      {
        imagen: "🐈‍⬛",
        pregunta: "¿Cuál gato es conocido por sus manchas como un leopardo?",
        opciones: ["Bengalí", "Siamés", "Tailandés", "Bobtail Japonés"],
        respuesta: "Bengalí",
      },
    ],
    indiceActual: 0,
    aciertos: 0,
  },
  sonidos: {
    preguntas: [
      {
        sonido: "🐱",
        pregunta: "Este es el sonido de un gato... ¿Qué significa?",
        opciones: [
          "Está feliz",
          "Tiene hambre",
          "Está asustado",
          "Está enfermo",
        ],
        respuesta: "Está feliz",
      },
      {
        sonido: "😾",
        pregunta: "Este gato emite un sonido fuerte... ¿Qué puede significar?",
        opciones: [
          "Quiere jugar",
          "Está asustado",
          "Quiere comer",
          "Se siente amado",
        ],
        respuesta: "Está asustado",
      },
    ],
    indiceActual: 0,
    aciertos: 0,
  },
  puzzle: {
    piezas: [
      "images/puzzle/gato1/pieza0.jpg",
      "images/puzzle/gato1/pieza1.jpg",
      "images/puzzle/gato1/pieza2.jpg",
      "images/puzzle/gato1/pieza3.jpg",
      "images/puzzle/gato1/pieza4.jpg",
      "images/puzzle/gato1/pieza5.jpg",
      "images/puzzle/gato1/pieza6.jpg",
      "images/puzzle/gato1/pieza7.jpg",
      "images/puzzle/gato1/pieza8.jpg",
    ],
    posiciones: new Array(9),
    completado: false,
  },
};

// Función para ir al menú desde la portada
function irAlMenu() {
  document.getElementById("portada-section").style.display = "none";
  document.getElementById("menu-container").style.display = "block";
}

// Función principal para cargar juegos
function cargarJuego(tipo) {
  juegoActual = tipo;
  document.getElementById("pantalla-inicio").style.display = "none";
  document.getElementById("juego-container").style.display = "block";
  document.getElementById("btn-volver").style.display = "block";

  const contenido = document.getElementById("contenido-juego");

  switch (tipo) {
    case "memoria":
      inicializarMemoria();
      break;
    case "adivinanza":
      inicializarAdivinanza();
      break;
    case "sonidos":
      inicializarSonidos();
      break;
    case "puzzle":
      inicializarPuzzle();
      break;
    case "reflejos":
      inicializarReflejos();
      break;
  }
}

// JUEGO DE MEMORIA
function inicializarMemoria() {
  // Construir 6 pares de imágenes desde la carpeta `gatosConPelo` (12 cartas)
  const pares = 6;
  const disponibles = gatosConPelo.slice();
  // mezclar disponibles
  disponibles.sort(() => Math.random() - 0.5);
  const seleccion = disponibles.slice(0, pares);

  const cartas = [];
  seleccion.forEach((img) => {
    cartas.push(img);
    cartas.push(img);
  });

  datos.memoria = {
    cartas: cartas.sort(() => Math.random() - 0.5),
    volteadas: [],
    acertadas: [],
    intentos: 0,
  };

  const contenido = document.getElementById("contenido-juego");
  let html =
    '<div class="puntuacion">Intentos: ' + datos.memoria.intentos + "</div>";
  html += '<div class="memoria-grid">';

  datos.memoria.cartas.forEach((carta, index) => {
    html +=
      '<button class="carta" onclick="volteaCarta(' +
      index +
      ')" id="carta-' +
      index +
      '">?</button>';
  });

  html += "</div>";
  contenido.innerHTML = html;
}

function volteaCarta(index) {
  if (
    datos.memoria.acertadas.includes(index) ||
    datos.memoria.volteadas.includes(index)
  ) {
    return;
  }

  datos.memoria.volteadas.push(index);
  const elemento = document.getElementById("carta-" + index);
  elemento.classList.add("volteada");
  // Mostrar la imagen dentro de la carta usando un <img>
  elemento.innerHTML =
    '<img src="' + datos.memoria.cartas[index] + '" alt="gato" />';

  if (datos.memoria.volteadas.length === 2) {
    datos.memoria.intentos++;
    document.querySelector(".puntuacion").textContent =
      "Intentos: " + datos.memoria.intentos;

    const [index1, index2] = datos.memoria.volteadas;

    if (datos.memoria.cartas[index1] === datos.memoria.cartas[index2]) {
      // Acierto
      datos.memoria.acertadas.push(index1, index2);
      document.getElementById("carta-" + index1).classList.add("acertada");
      document.getElementById("carta-" + index2).classList.add("acertada");

      datos.memoria.volteadas = [];

      if (datos.memoria.acertadas.length === datos.memoria.cartas.length) {
        setTimeout(() => {
          document.getElementById("contenido-juego").innerHTML +=
            '<div class="mensaje-exito">🎉 ¡Ganaste! ¡Excelente trabajo!</div>';
        }, 500);
      }
    } else {
      // No es un acierto, voltear de vuelta
      setTimeout(() => {
        const c1 = document.getElementById("carta-" + index1);
        const c2 = document.getElementById("carta-" + index2);
        if (c1) {
          c1.classList.remove("volteada");
          c1.innerHTML = "?";
        }
        if (c2) {
          c2.classList.remove("volteada");
          c2.innerHTML = "?";
        }
        datos.memoria.volteadas = [];
      }, 1000);
    }
  }
}

// JUEGO DE ADIVINANZA
function inicializarAdivinanza() {
  datos.adivinanza.indiceActual = 0;
  datos.adivinanza.aciertos = 0;
  mostrarPreguntaAdivinanza();
}

function mostrarPreguntaAdivinanza() {
  if (datos.adivinanza.indiceActual >= datos.adivinanza.preguntas.length) {
    const contenido = document.getElementById("contenido-juego");
    contenido.innerHTML =
      '<div class="mensaje-exito">🎉 ¡Completaste el quiz! Acertaste: ' +
      datos.adivinanza.aciertos +
      "/" +
      datos.adivinanza.preguntas.length +
      "</div>";
    return;
  }

  const pregunta = datos.adivinanza.preguntas[datos.adivinanza.indiceActual];
  const contenido = document.getElementById("contenido-juego");

  let html = '<div class="quiz-container">';
  html += '<div class="pregunta">' + pregunta.pregunta + "</div>";
  html +=
    '<div style="font-size: 3em; text-align: center; margin: 20px 0;">' +
    pregunta.imagen +
    "</div>";
  html += '<div class="opciones">';

  pregunta.opciones.forEach((opcion, index) => {
    html +=
      '<button class="btn-opcion" onclick="verificarAdivinanza(\'' +
      opcion +
      "', " +
      index +
      ')">' +
      opcion +
      "</button>";
  });

  html += "</div>";
  html +=
    '<div style="text-align: center; font-size: 1em; color: #999;">Pregunta ' +
    (datos.adivinanza.indiceActual + 1) +
    "/" +
    datos.adivinanza.preguntas.length +
    "</div>";
  html += "</div>";

  contenido.innerHTML = html;
}

function verificarAdivinanza(respuesta, index) {
  const pregunta = datos.adivinanza.preguntas[datos.adivinanza.indiceActual];
  const botones = document.querySelectorAll(".btn-opcion");

  botones.forEach((btn) => (btn.disabled = true));

  if (respuesta === pregunta.respuesta) {
    document.querySelectorAll(".btn-opcion")[index].classList.add("correcto");
    datos.adivinanza.aciertos++;
  } else {
    document.querySelectorAll(".btn-opcion")[index].classList.add("incorrecto");
    pregunta.opciones.forEach((opcion, i) => {
      if (opcion === pregunta.respuesta) {
        document.querySelectorAll(".btn-opcion")[i].classList.add("correcto");
      }
    });
  }

  setTimeout(() => {
    datos.adivinanza.indiceActual++;
    mostrarPreguntaAdivinanza();
  }, 1500);
}

// JUEGO DE SONIDOS
function inicializarSonidos() {
  datos.sonidos.indiceActual = 0;
  datos.sonidos.aciertos = 0;
  mostrarPreguntaSonidos();
}

function mostrarPreguntaSonidos() {
  if (datos.sonidos.indiceActual >= datos.sonidos.preguntas.length) {
    const contenido = document.getElementById("contenido-juego");
    contenido.innerHTML =
      '<div class="mensaje-exito">🎉 ¡Completaste el quiz de sonidos! Acertaste: ' +
      datos.sonidos.aciertos +
      "/" +
      datos.sonidos.preguntas.length +
      "</div>";
    return;
  }

  const pregunta = datos.sonidos.preguntas[datos.sonidos.indiceActual];
  const contenido = document.getElementById("contenido-juego");

  let html = '<div class="sonidos-container">';
  html += '<div class="pregunta">' + pregunta.pregunta + "</div>";
  html +=
    '<button class="btn-reproducir" onclick="reproducirSonido()">🔊 Escuchar Sonido</button>';
  html += '<div class="opciones">';

  pregunta.opciones.forEach((opcion, index) => {
    html +=
      '<button class="btn-opcion" onclick="verificarSonidos(\'' +
      opcion +
      "', " +
      index +
      ')">' +
      opcion +
      "</button>";
  });

  html += "</div>";
  html +=
    '<div style="text-align: center; font-size: 1em; color: #999;">Pregunta ' +
    (datos.sonidos.indiceActual + 1) +
    "/" +
    datos.sonidos.preguntas.length +
    "</div>";
  html += "</div>";

  contenido.innerHTML = html;
}

function reproducirSonido() {
  const pregunta = datos.sonidos.preguntas[datos.sonidos.indiceActual];
  // Simular reproducción de sonido con un emoji animado
  alert("🔊 Sonido del gato: " + pregunta.sonido + " (miau/ronroneo)");
}

function verificarSonidos(respuesta, index) {
  const pregunta = datos.sonidos.preguntas[datos.sonidos.indiceActual];
  const botones = document.querySelectorAll(".btn-opcion");

  botones.forEach((btn) => (btn.disabled = true));

  if (respuesta === pregunta.respuesta) {
    botones[index].classList.add("correcto");
    datos.sonidos.aciertos++;
  } else {
    botones[index].classList.add("incorrecto");
    pregunta.opciones.forEach((opcion, i) => {
      if (opcion === pregunta.respuesta) {
        botones[i].classList.add("correcto");
      }
    });
  }

  setTimeout(() => {
    datos.sonidos.indiceActual++;
    mostrarPreguntaSonidos();
  }, 1500);
}

// JUEGO DE PUZZLE
function inicializarPuzzle() {
  datos.puzzle.posiciones = new Array(9);
  datos.puzzle.completado = false;

  const contenido = document.getElementById("contenido-juego");

  let html = '<div class="puzzle-container">';
  html +=
    '<div class="pregunta">Completa el puzzle colocando todos los emojis en las casillas</div>';
  html += '<div class="puzzle-grid">';

  for (let i = 0; i < 9; i++) {
    html +=
      '<button class="pieza-puzzle" id="puzzle-' +
      i +
      '" ondragover="allowDrop(event)" ondrop="dropOnCell(event, ' +
      i +
      ')">?</button>';
  }

  html += "</div>";
  html +=
    '<div style="text-align: center; margin-top: 30px; font-size: 1.2em;">Piezas disponibles:</div>';
  html += '<div style="text-align: center; font-size: 2em; margin-top: 15px;">';

  datos.puzzle.piezas.forEach((pieza, index) => {
    html +=
      '<span style="margin: 0 10px; display: inline-block; width:48px; height:48px;" id="pieza-' +
      index +
      '">' +
      '<img draggable="true" ondragstart="dragStartPiece(event, ' +
      index +
      ')" ontouchstart="touchStartPiece(event, ' +
      index +
      ')" ontouchend="touchEndPiece(event)" src="' +
      pieza +
      '" alt="pieza" style="width:100%; height:100%; object-fit:cover; border-radius:6px; cursor:grab;" />' +
      "</span>";
  });

  html += "</div>";
  html += "</div>";

  contenido.innerHTML = html;
}

let piezaSeleccionada = null;

function seleccionarPieza(index) {
  piezaSeleccionada = index;
  document
    .querySelectorAll('[id^="pieza-"]')
    .forEach((p) => (p.style.opacity = "0.5"));
  document.getElementById("pieza-" + index).style.opacity = "1";
}

// --- Drag & Drop handlers for puzzle pieces ---
function dragStartPiece(event, index) {
  // Transfer the piece index as payload
  event.dataTransfer.setData("text/plain", String(index));
  // set effect
  event.dataTransfer.effectAllowed = "move";
}

function allowDrop(event) {
  event.preventDefault();
  // visual feedback
  const cell = event.currentTarget;
  if (cell) cell.classList.add("drag-over");
}

function dropOnCell(event, posicion) {
  event.preventDefault();
  const cell = document.getElementById("puzzle-" + posicion);
  if (cell) cell.classList.remove("drag-over");
  const data = event.dataTransfer.getData("text/plain");
  if (!data) return;
  const piezaIndex = parseInt(data, 10);

  // if the cell already has a correct piece, ignore
  if (
    datos.puzzle.posiciones[posicion] !== undefined &&
    datos.puzzle.posiciones[posicion] === posicion
  ) {
    return;
  }

  // if piece already used in another correct spot, hide it
  const piezaElem = document.getElementById("pieza-" + piezaIndex);

  // Place temporarily and validate
  datos.puzzle.posiciones[posicion] = piezaIndex;
  cell.innerHTML =
    '<img src="' + datos.puzzle.piezas[piezaIndex] + '" alt="pieza" />';

  if (piezaIndex === posicion) {
    // correct
    cell.classList.add("colocada");
    if (piezaElem) piezaElem.style.display = "none";
  } else {
    // incorrect: show feedback and revert
    cell.classList.add("incorrecta");
    setTimeout(() => {
      cell.classList.remove("incorrecta");
      cell.innerHTML = "?";
      datos.puzzle.posiciones[posicion] = undefined;
    }, 900);
  }

  // After drop, check completion
  const completadoCorrecto = datos.puzzle.posiciones.every(
    (p, idx) => p === idx
  );
  if (completadoCorrecto) {
    setTimeout(() => {
      document.getElementById("contenido-juego").innerHTML +=
        '<div class="mensaje-exito">🎉 ¡Correcto!</div>';
    }, 300);
  }
}

// Shared placement function used by both mouse drop and touch
function placePiece(piezaIndex, posicion) {
  const cell = document.getElementById("puzzle-" + posicion);
  if (!cell) return;

  // if the cell already has a correct piece, ignore
  if (
    datos.puzzle.posiciones[posicion] !== undefined &&
    datos.puzzle.posiciones[posicion] === posicion
  ) {
    return;
  }

  const piezaElem = document.getElementById("pieza-" + piezaIndex);

  datos.puzzle.posiciones[posicion] = piezaIndex;
  cell.innerHTML =
    '<img src="' + datos.puzzle.piezas[piezaIndex] + '" alt="pieza" />';

  if (piezaIndex === posicion) {
    cell.classList.add("colocada");
    if (piezaElem) piezaElem.style.display = "none";
  } else {
    cell.classList.add("incorrecta");
    setTimeout(() => {
      cell.classList.remove("incorrecta");
      cell.innerHTML = "?";
      datos.puzzle.posiciones[posicion] = undefined;
    }, 900);
  }

  const completadoCorrecto = datos.puzzle.posiciones.every(
    (p, idx) => p === idx
  );
  if (completadoCorrecto) {
    setTimeout(() => {
      document.getElementById("contenido-juego").innerHTML +=
        '<div class="mensaje-exito">🎉 ¡Puzzle completado!</div>';
    }, 300);
  }
}

// Touch handlers for mobile devices
let _touchPiezaIndex = null;
function touchStartPiece(event, index) {
  // prevent default to avoid scrolling/zooming
  event.preventDefault();
  _touchPiezaIndex = index;
}

function touchEndPiece(event) {
  event.preventDefault();
  if (_touchPiezaIndex === null) return;
  const touch = event.changedTouches && event.changedTouches[0];
  if (!touch) return;

  // find the element at the touch position
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (!el) {
    _touchPiezaIndex = null;
    return;
  }

  // find ancestor cell
  let cell = el;
  while (cell && !cell.id?.startsWith("puzzle-")) {
    cell = cell.parentElement;
  }

  if (cell && cell.id) {
    const posicion = parseInt(cell.id.replace("puzzle-", ""), 10);
    if (!Number.isNaN(posicion)) {
      placePiece(_touchPiezaIndex, posicion);
    }
  }

  _touchPiezaIndex = null;
}

function colocarPieza(posicion) {
  if (piezaSeleccionada === null) {
    alert("Selecciona una pieza primero");
    return;
  }

  if (datos.puzzle.posiciones[posicion] !== undefined) {
    alert("Esta casilla ya está ocupada");
    return;
  }
  // Colocar temporalmente la pieza en la casilla
  const piezaIndex = piezaSeleccionada;
  const cell = document.getElementById("puzzle-" + posicion);
  datos.puzzle.posiciones[posicion] = piezaIndex;
  cell.innerHTML =
    '<img src="' + datos.puzzle.piezas[piezaIndex] + '" alt="pieza" />';

  // Comprobar si la pieza es la correcta para esta posición
  // (las piezas fueron generadas como pieza0 -> posición 0, pieza1 -> pos1, ...)
  if (piezaIndex === posicion) {
    // correcta
    cell.classList.add("colocada");
    const piezaElem = document.getElementById("pieza-" + piezaIndex);
    if (piezaElem) piezaElem.style.display = "none";
  } else {
    // incorrecta: marcar visualmente y revertir
    cell.classList.add("incorrecta");
    setTimeout(() => {
      cell.classList.remove("incorrecta");
      cell.innerHTML = "?";
      datos.puzzle.posiciones[posicion] = undefined;
      // mostrar de nuevo la pieza en el panel de piezas
      const piezaElem = document.getElementById("pieza-" + piezaIndex);
      if (piezaElem) piezaElem.style.display = "inline-block";
    }, 900);
  }

  // limpiar selección y restablecer opacidad
  piezaSeleccionada = null;
  document
    .querySelectorAll('[id^="pieza-"]')
    .forEach((p) => (p.style.opacity = "1"));

  // Verificar si todas las piezas están correctamente colocadas
  const completadoCorrecto = datos.puzzle.posiciones.every(
    (p, idx) => p === idx
  );
  if (completadoCorrecto) {
    setTimeout(() => {
      document.getElementById("contenido-juego").innerHTML +=
        '<div class="mensaje-exito">🎉 ¡Puzzle completado!</div>';
    }, 300);
  }
}

// Función para volver al menú
function volverAlInicio() {
  juegoActual = null;
  document.getElementById("pantalla-inicio").style.display = "flex";
  document.getElementById("juego-container").style.display = "none";
  document.getElementById("btn-volver").style.display = "none";
  document.getElementById("contenido-juego").innerHTML = "";
  piezaSeleccionada = null;

  // Detener juego de reflejos si está activo
  if (window.juegoReflojosActivo) {
    window.juegoReflojosActivo = false;
    if (window.tiempoReflejos) clearInterval(window.tiempoReflejos);
    if (window.spawnGatosInterval) clearInterval(window.spawnGatosInterval);
  }
}

// JUEGO DE REFLEJOS
window.juegoReflojosActivo = false;
window.tiempoReflejos = null;
window.spawnGatosInterval = null;

function inicializarReflejos() {
  const contenido = document.getElementById("contenido-juego");

  let html = '<div class="reflejos-container">';
  html += '<div class="instrucciones-reflejos">';
  html += "<strong>🎮 Elige tu nivel de dificultad:</strong><br>";
  html += "⏱️ Las tarjetas desaparecen en diferente tiempo según la dificultad";
  html += "</div>";

  html += '<div class="modos-dificultad">';
  html +=
    '<button class="btn-modo facil" onclick="seleccionarModo(\'facil\')">😊 FÁCIL<br><small>5 segundos</small></button>';
  html +=
    '<button class="btn-modo normal" onclick="seleccionarModo(\'normal\')">😎 NORMAL<br><small>3 segundos</small></button>';
  html +=
    '<button class="btn-modo dificil" onclick="seleccionarModo(\'dificil\')">🔥 DIFÍCIL<br><small>1.5 segundos</small></button>';
  html += "</div>";

  html += '<div id="contenido-juego-reflejos" style="display: none;">';
  html += '<div class="instrucciones-reflejos">';
  html += "<strong>🎮 Instrucciones:</strong><br>";
  html +=
    "✅ Haz clic en los gatos <strong>CON PELO</strong> (😺 😸 😹 😻 😼 😽)<br>";
  html +=
    "❌ NO toques el gato <strong>CALVO</strong> (🙀) - ¡Pierdes directamente!<br>";
  html +=
    "⚠️ Si no tocas un gato con pelo antes de que desaparezca - ¡También pierdes!<br>";
  html += "⏱️ Tienes 60 segundos. ¡Sé rápido!";
  html += "</div>";
  html += '<div class="puntuacion-reflejos">';
  html +=
    '<div class="stat-box aciertos">✅ Aciertos: <span id="aciertos-reflejos">0</span></div>';
  html +=
    '<div class="stat-box errores">❌ Errores: <span id="errores-reflejos">0</span></div>';
  html += "</div>";
  html +=
    '<div class="cronometro">⏱️ Tiempo: <span id="cronometro-valor">60</span>s</div>';
  html +=
    '<div id="modo-actual" style="text-align: center; font-size: 1.1em; margin-bottom: 15px; font-weight: bold;"></div>';
  html += '<div class="gatos-grid-reflejos" id="gatos-grid"></div>';
  html +=
    '<button class="boton-iniciar-reflejos" id="btn-iniciar-reflejos" onclick="iniciarJuegoReflejos()">Comenzar Juego</button>';
  html += "</div>";
  html += "</div>";

  contenido.innerHTML = html;

  // Inicializar datos
  window.datosReflejos = {
    aciertos: 0,
    errores: 0,
    tiempo: 60,
    juegoEnCurso: false,
    gatosPresentados: 0,
    juegoTerminado: false,
    modo: null,
    tiempoDesaparicion: 2000,
  };
}

function seleccionarModo(modo) {
  window.datosReflejos.modo = modo;

  // Configurar tiempo de desaparición según el modo
  switch (modo) {
    case "facil":
      window.datosReflejos.tiempoDesaparicion = 5000;
      document.getElementById("modo-actual").textContent =
        "😊 Modo: FÁCIL (5 seg)";
      break;
    case "normal":
      window.datosReflejos.tiempoDesaparicion = 3000;
      document.getElementById("modo-actual").textContent =
        "😎 Modo: NORMAL (3 seg)";
      break;
    case "dificil":
      window.datosReflejos.tiempoDesaparicion = 1500;
      document.getElementById("modo-actual").textContent =
        "🔥 Modo: DIFÍCIL (1.5 seg)";
      break;
  }

  // Ocultar selector de modos y mostrar juego
  document.querySelector(".modos-dificultad").style.display = "none";
  document.querySelector(".instrucciones-reflejos").style.display = "none";
  document.getElementById("contenido-juego-reflejos").style.display = "block";
}

function iniciarJuegoReflejos() {
  window.juegoReflojosActivo = true;
  window.datosReflejos.juegoEnCurso = true;
  window.datosReflejos.aciertos = 0;
  window.datosReflejos.errores = 0;
  window.datosReflejos.tiempo = 60;
  window.datosReflejos.gatosPresentados = 0;
  window.datosReflejos.juegoTerminado = false;

  document.getElementById("btn-iniciar-reflejos").disabled = true;
  document.getElementById("aciertos-reflejos").textContent = "0";
  document.getElementById("errores-reflejos").textContent = "0";
  document.getElementById("cronometro-valor").textContent = "60";

  // Limpiar grid
  document.getElementById("gatos-grid").innerHTML = "";

  // Temporizador
  window.tiempoReflejos = setInterval(() => {
    window.datosReflejos.tiempo--;
    document.getElementById("cronometro-valor").textContent =
      window.datosReflejos.tiempo;

    if (window.datosReflejos.tiempo <= 0) {
      terminarJuegoReflejos();
    }
  }, 1000);

  // Generar gatos cada 400ms
  window.spawnGatosInterval = setInterval(() => {
    if (window.juegoReflojosActivo && window.datosReflejos.juegoEnCurso) {
      generarGatoAleatorio();
    }
  }, 400);

  // Generar el primer gato inmediatamente
  generarGatoAleatorio();
}

function generarGatoAleatorio() {
  if (window.datosReflejos.juegoTerminado || !window.datosReflejos.juegoEnCurso)
    return;

  const grid = document.getElementById("gatos-grid");
  const aleatorio = Math.random();
  const tienePelo = aleatorio > 0.2; // 80% con pelo, 20% gato calvo
  const esCalvo = !tienePelo;

  // Seleccionar imagen real aleatoria
  const imagen = tienePelo
    ? gatosConPelo[Math.floor(Math.random() * gatosConPelo.length)]
    : gatosCalvos[Math.floor(Math.random() * gatosCalvos.length)];

  const id = "gato-" + Date.now() + Math.random();

  let html =
    '<button class="gato-item ' +
    (tienePelo ? "con-pelo" : "sin-pelo") +
    '" id="' +
    id +
    '" onclick="clickearGato(\'' +
    id +
    "', " +
    tienePelo +
    ", " +
    esCalvo +
    ')" style="background-image: url(\'' +
    imagen +
    "'); background-size: cover; background-position: center;\"></button>";

  // Crear elemento temporal
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const boton = tempDiv.querySelector("button");

  // Insertar en posición aleatoria del grid
  let celdasLibres = [];
  for (let i = 0; i < 9; i++) {
    if (
      grid.children[i] === undefined ||
      grid.children[i].style.opacity === "0"
    ) {
      celdasLibres.push(i);
    }
  }

  if (celdasLibres.length > 0) {
    const posLibre =
      celdasLibres[Math.floor(Math.random() * celdasLibres.length)];
    if (grid.children[posLibre]) {
      grid.replaceChild(boton, grid.children[posLibre]);
    } else {
      grid.appendChild(boton);
    }
  } else {
    grid.appendChild(boton);
  }

  // Desaparecer después del tiempo configurado según el modo
  const timeoutId = setTimeout(() => {
    const elemento = document.getElementById(id);
    if (elemento && elemento.style.pointerEvents !== "none") {
      // Si no fue clickeado y es un gato con pelo, pierdes
      if (tienePelo) {
        perdiste(id, "no_toque");
      }
      elemento.style.opacity = "0";
      elemento.style.pointerEvents = "none";
    }
  }, window.datosReflejos.tiempoDesaparicion);
}

function clickearGato(id, tienePelo, esCalvo) {
  if (!window.datosReflejos.juegoEnCurso || window.datosReflejos.juegoTerminado)
    return;

  const elemento = document.getElementById(id);
  if (!elemento || elemento.style.pointerEvents === "none") return;

  elemento.style.pointerEvents = "none";

  if (esCalvo) {
    // ¡Tocaste el gato calvo! ¡Pierdes directamente!
    perdiste(id, "gato_calvo");
  } else if (tienePelo) {
    // ¡Acierto!
    window.datosReflejos.aciertos++;
    elemento.classList.add("acertado");
    document.getElementById("aciertos-reflejos").textContent =
      window.datosReflejos.aciertos;
    elemento.style.opacity = "0";
  } else {
    // Error
    window.datosReflejos.errores++;
    elemento.classList.add("fallado");
    document.getElementById("errores-reflejos").textContent =
      window.datosReflejos.errores;
    elemento.style.opacity = "0";
  }
}

function terminarJuegoReflejos(razon = "tiempo") {
  window.juegoReflojosActivo = false;
  window.datosReflejos.juegoEnCurso = false;
  window.datosReflejos.juegoTerminado = true;
  clearInterval(window.tiempoReflejos);
  clearInterval(window.spawnGatosInterval);

  const grid = document.getElementById("gatos-grid");
  grid.innerHTML = "";

  const contenido = document.getElementById("contenido-juego");
  const puntuacionFinal =
    window.datosReflejos.aciertos - window.datosReflejos.errores * 2;

  let mensajeFinal = "";
  if (razon === "gato_calvo") {
    mensajeFinal =
      '<div class="mensaje-exito" style="font-size: 1.2em; margin-top: 20px; color: #f44336;">' +
      "<p>😱 ¡GAME OVER! ¡Tocaste el gato calvo!</p>";
  } else if (razon === "no_toque") {
    mensajeFinal =
      '<div class="mensaje-exito" style="font-size: 1.2em; margin-top: 20px; color: #f44336;">' +
      "<p>😱 ¡GAME OVER! ¡No tocaste el gato a tiempo!</p>";
  } else {
    mensajeFinal =
      '<div class="mensaje-exito" style="font-size: 1.2em; margin-top: 20px;">' +
      "<p>🎉 ¡Se acabó el tiempo!</p>";
  }

  mensajeFinal +=
    '<p style="font-size: 1.3em; margin-top: 10px;">✅ Aciertos: ' +
    window.datosReflejos.aciertos +
    "</p>" +
    '<p style="font-size: 1.3em; color: #f44336;">❌ Errores: ' +
    window.datosReflejos.errores +
    "</p>" +
    '<p style="font-size: 1.5em; margin-top: 15px; color: #667eea;">📊 Puntuación: ' +
    Math.max(0, puntuacionFinal) +
    "</p>" +
    "</div>";

  contenido.innerHTML += mensajeFinal;

  const btn = document.getElementById("btn-iniciar-reflejos");
  if (btn) {
    btn.disabled = false;
    btn.textContent = "Jugar de Nuevo";
  }
}

function perdiste(id, tipo) {
  window.juegoReflojosActivo = false;
  window.datosReflejos.juegoEnCurso = false;
  window.datosReflejos.juegoTerminado = true;
  clearInterval(window.tiempoReflejos);
  clearInterval(window.spawnGatosInterval);

  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.classList.add("fallado");
  }

  terminarJuegoReflejos(tipo);
}
