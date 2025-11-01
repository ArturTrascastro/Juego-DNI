document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const showIdentityBtn = document.getElementById("showIdentityBtn");
  const nextPlayerBtn = document.getElementById("nextPlayerBtn");
  const nextSituationBtn = document.getElementById("nextSituationBtn");
  const restartBtn = document.getElementById("restartBtn");

  const setupDiv = document.getElementById("setup");
  const playerScreen = document.getElementById("playerScreen");
  const situationScreen = document.getElementById("situationScreen");

  const playerNameEl = document.getElementById("playerName");
  const playerPrompt = document.getElementById("playerPrompt");
  const situationDiv = document.getElementById("situation");

  let players = [];
  let asignaciones = [];
  let currentPlayer = 0;

  const situaciones = [
    "Estás en una fiesta y ves a tu ex hablando con tu mejor amigo. ¿Qué haces?",
    "Tu grupo planea una salida, pero se olvidan de invitarte. ¿Cómo reaccionas?",
    "Te enteras de que alguien del grupo ha estado hablando mal de ti. ¿Cómo lo enfrentas?",
    "Tienes que elegir a alguien del grupo para que te acompañe a una cita doble. ¿A quién eliges y por qué?",
    "Alguien te manda un mensaje diciendo 'tenemos que hablar'. ¿Qué piensas que pasa?",
    "Publicas una historia pensando que era para tus mejores amigos, pero la ve todo el mundo. ¿Qué haces?",
    "Tu crush te pide ayuda con otra persona que le gusta. ¿Qué le dices?",
    "Alguien del grupo te pide que le guardes un secreto importante. ¿Lo harías?",
    "En medio de una discusión, alguien del grupo saca algo que contaste en confianza. ¿Cómo reaccionas?",
    "Te toca organizar una sorpresa para alguien que no te cae muy bien. ¿Cómo lo gestionas?",
    "Tu mejor amigo empieza a salir con alguien que no soportas. ¿Qué haces?",
    "Te toca elegir entre ir a una fiesta increíble o quedarte a ayudar a un amigo que lo está pasando mal. ¿Qué haces?",
    "Estás en una reunión del grupo y alguien te acusa de haber filtrado un secreto. ¿Cómo te defiendes?",
    "Estás jugando a verdad o reto y te toca confesar tu último error. ¿Qué dices?",
    "Alguien del grupo se olvida de tu cumpleaños. ¿Le haces saber que te molestó o lo dejas pasar?",
    "Tu ex te escribe justo cuando te está empezando a gustar otra persona. ¿Qué haces?",
    "Hay tensión en el grupo porque dos personas se pelearon. ¿De qué lado estás?",
    "Tu amigo te etiqueta en una foto horrible. ¿Le dices algo o finges que no te importa?",
    "Tu grupo quiere hacer un viaje juntos, pero alguien propone invitar a una persona que no soportas. ¿Qué haces?",
    "Descubres que alguien del grupo está mintiendo sobre algo importante. ¿Lo confrontas o esperas a ver qué pasa?"
  ];

  // Iniciar juego
  startBtn.addEventListener("click", () => {
    const rawNames = document.getElementById("nameList").value.trim();
    if (!rawNames) return alert("Introduce al menos dos nombres.");

    players = rawNames.split("\n").map(n => n.trim()).filter(Boolean);
    if (players.length < 2) return alert("Debe haber al menos dos jugadores.");

    asignaciones = generarAsignaciones(players);

    currentPlayer = 0;
    setupDiv.classList.add("hidden");
    playerScreen.classList.remove("hidden");
    nextPlayerBtn.classList.add("hidden");

    mostrarJugador();
  });

  // Mostrar identidad
  showIdentityBtn.addEventListener("click", () => {
    playerPrompt.textContent = `Interpreta a: ${asignaciones[currentPlayer]}`;
    showIdentityBtn.classList.add("hidden");
    nextPlayerBtn.classList.remove("hidden");
  });

  // Siguiente jugador
  nextPlayerBtn.addEventListener("click", () => {
    currentPlayer++;
    if (currentPlayer >= players.length) {
      playerScreen.classList.add("hidden");
      situationScreen.classList.remove("hidden");
      mostrarSituacion();
    } else {
      mostrarJugador();
      showIdentityBtn.classList.remove("hidden");
      nextPlayerBtn.classList.add("hidden");
    }
  });

  // Nueva situación
  nextSituationBtn.addEventListener("click", mostrarSituacion);

  // Reiniciar juego
  restartBtn.addEventListener("click", () => location.reload());

  function mostrarJugador() {
    playerNameEl.textContent = `Jugador: ${players[currentPlayer]}`;
    playerPrompt.textContent = "Haz click en el botón para ver tu identidad.";
  }

  function generarAsignaciones(names) {
    let shuffled = [...names];
    do {
      shuffled = mezclarArray([...names]);
    } while (shuffled.some((name, i) => name === names[i]));
    return shuffled;
  }

  function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function mostrarSituacion() {
    const randomIndex = Math.floor(Math.random() * situaciones.length);
    situationDiv.textContent = situaciones[randomIndex];
  }

});
