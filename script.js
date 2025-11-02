document.addEventListener("DOMContentLoaded", () => {
  // Botones principales
  const themeToggle = document.getElementById("themeToggle");
  const goToSetup = document.getElementById("goToSetup");
  const goToHowToPlay = document.getElementById("goToHowToPlay");
  const backToHome = document.getElementById("backToHome");

  const startBtn = document.getElementById("startBtn");
  const showIdentityBtn = document.getElementById("showIdentityBtn");
  const nextPlayerBtn = document.getElementById("nextPlayerBtn");
  const nextSituationBtn = document.getElementById("nextSituationBtn");
  const restartBtn = document.getElementById("restartBtn");

  // Pantallas
  const homeScreen = document.getElementById("homeScreen");
  const howToPlayScreen = document.getElementById("howToPlayScreen");
  const setupDiv = document.getElementById("setup");
  const playerScreen = document.getElementById("playerScreen");
  const situationScreen = document.getElementById("situationScreen");

  const playerNameEl = document.getElementById("playerName");
  const playerPrompt = document.getElementById("playerPrompt");
  const situationDiv = document.getElementById("situation");

  // Datos
  let players = [];
  let asignaciones = [];
  let currentPlayer = 0;

  // Situaciones
  const situaciones = [
    "Estás en una fiesta y ves a tu ex hablando con tu mejor amigo. ¿Qué haces?",
    "Tu grupo planea una salida, pero se olvidan de invitarte. ¿Cómo reaccionas?",
    "Te enteras de que alguien del grupo ha estado hablando mal de ti. ¿Cómo lo enfrentas?",
    "Tienes que elegir a alguien del grupo para una cita doble. ¿A quién eliges?",
    "Publicas algo por error en tus historias. ¿Qué haces?",
    "Tu mejor amigo empieza a salir con alguien que no soportas. ¿Cómo reaccionas?",
    "Descubres que alguien del grupo mintió sobre algo importante. ¿Qué haces?",
    "Estás jugando a verdad o reto y te toca confesar tu último error. ¿Qué dices?",
    "Tu crush te pide consejo sobre otra persona. ¿Qué respondes?",
    "Tu grupo organiza un plan sin ti. ¿Cómo te lo tomas?"
  ];

  // Tema oscuro
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", savedTheme === "dark");
  actualizarBotonTema();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
    actualizarBotonTema();
  });

  function actualizarBotonTema() {
    themeToggle.textContent = document.body.classList.contains("dark")
      ? "Modo claro"
      : "Modo oscuro";
  }

  // Navegación entre pantallas
  goToSetup.addEventListener("click", () => mostrarPantalla(setupDiv));
  goToHowToPlay.addEventListener("click", () => mostrarPantalla(howToPlayScreen));
  backToHome.addEventListener("click", () => mostrarPantalla(homeScreen));

  startBtn.addEventListener("click", () => {
    const rawNames = document.getElementById("nameList").value.trim();
    if (!rawNames) return alert("Introduce al menos dos nombres.");
    players = rawNames.split("\n").map(n => n.trim()).filter(Boolean);
    if (players.length < 2) return alert("Debe haber al menos dos jugadores.");

    asignaciones = generarAsignaciones(players);
    currentPlayer = 0;
    mostrarPantalla(playerScreen);
    mostrarJugador();
  });

  showIdentityBtn.addEventListener("click", () => {
    playerPrompt.textContent = `Interpreta a: ${asignaciones[currentPlayer]}`;
    showIdentityBtn.classList.add("hidden");
    nextPlayerBtn.classList.remove("hidden");
  });

  nextPlayerBtn.addEventListener("click", () => {
    currentPlayer++;
    if (currentPlayer >= players.length) {
      mostrarPantalla(situationScreen);
      mostrarSituacion();
    } else {
      mostrarJugador();
      showIdentityBtn.classList.remove("hidden");
      nextPlayerBtn.classList.add("hidden");
    }
  });

  nextSituationBtn.addEventListener("click", mostrarSituacion);
  restartBtn.addEventListener("click", () => location.reload());

  // Funciones de pantalla
  function mostrarPantalla(nuevaPantalla) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    nuevaPantalla.classList.remove("hidden");
  }

  function mostrarJugador() {
    playerNameEl.textContent = `Jugador: ${players[currentPlayer]}`;
    playerPrompt.textContent = "Haz click en el botón para ver tu identidad.";
  }

  function generarAsignaciones(names) {
    let shuffled;
    do {
      shuffled = [...names].sort(() => Math.random() - 0.5);
    } while (shuffled.some((n, i) => n === names[i]));
    return shuffled;
  }

  function mostrarSituacion() {
    const randomIndex = Math.floor(Math.random() * situaciones.length);
    situationDiv.textContent = situaciones[randomIndex];
  }
});
