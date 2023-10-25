const tablero = document.querySelector(".tablero");
const puntuacionElemento = document.querySelector(".puntuacion");
const puntuacionMaxElemento = document.querySelector(".puntuacionMax");

let gameOver = false;
let comidaX = 13,
  comidaY = 10;
let snakeX = 5,
  snakeY = 10;
let velocidadX = 0,
  velocidadY = 0;
let cuerpoSnake = [];
let setIntervalId;
let puntuacion = 0;
let puntuacionMax = localStorage.getItem("puntuacionMax") || 0;
puntuacionMaxElemento.innerHTML = `Puntuación Maxima: ${puntuacionMax}`;

const cambiarPosicionComida = () => {
  comidaX = Math.floor(Math.random() * 30) + 1;
  comidaY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  const mensajeGameOver = document.getElementById("mensaje");
  mensajeGameOver.style.display = "block";
  const puntuacionFinal = document.getElementById("puntuacionFinal");
  puntuacionFinal.innerHTML = `Tu puntuación: ${puntuacion}`;

  // Agrega un event listener para el botón de reinicio
  const reiniciarBtn = document.getElementById("reiniciarBtn");
  reiniciarBtn.addEventListener("click", reiniciarPartida);
};

const reiniciarPartida = () => {
  // Restablece todas las variables del juego y oculta el mensaje de Game Over
  gameOver = false;
  puntuacion = 0;
  puntuacionElemento.innerHTML = "Puntuación: 0";
  const mensajeGameOver = document.getElementById("mensaje");
  mensajeGameOver.style.display = "none";
  cambiarPosicionComida();
  cuerpoSnake = [];
  velocidadX = 0;
  velocidadY = 0;
  snakeX = 5;
  snakeY = 10;

  // Comienza un nuevo juego
  setIntervalId = setInterval(initGame, 125);
};

const cambioDireccion = (e) => {
  console.log(e);
  if (e.key === "ArrowUp" && velocidadY != 1) {
    velocidadX = 0;
    velocidadY = -1;
  } else if (e.key === "ArrowDown" && velocidadY != -1) {
    velocidadX = 0;
    velocidadY = 1;
  } else if (e.key === "ArrowLeft" && velocidadX != 1) {
    velocidadX = -1;
    velocidadY = 0;
  } else if (e.key === "ArrowRight" && velocidadX != -1) {
    velocidadX = 1;
    velocidadY = 0;
  }
};

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX}"></div>`;
  //Comprueba si la cabeza de la serpiente coincide con la comida antes de actualizar el cuerpo.
  if (snakeX === comidaX && snakeY === comidaY) {
    cambiarPosicionComida();
    cuerpoSnake.push([comidaX, comidaY]);
    puntuacion++;
    puntuacionMax = puntuacion >= puntuacionMax ? puntuacion : puntuacionMax;
    localStorage.setItem("puntuacionMax", puntuacionMax);
    puntuacionElemento.innerHTML = `Puntuación: ${puntuacion}`;
    puntuacionMaxElemento.innerHTML = `Puntuación Maxima: ${puntuacionMax}`;
  }
  if (cuerpoSnake.length > 0) {
    for (let i = cuerpoSnake.length - 1; i > 0; i--) {
      cuerpoSnake[i] = cuerpoSnake[i - 1];
    }
  }
  cuerpoSnake[0] = [snakeX, snakeY];
  snakeX += velocidadX;
  snakeY += velocidadY; // y = 10 - 1 = 9
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < cuerpoSnake.length; i++) {
    if (i === 0) {
      htmlMarkup += `<div class="cabeza" style="grid-area: ${cuerpoSnake[i][1]} / ${cuerpoSnake[i][0]}"></div>`;
    } else {
      htmlMarkup += `<div class="cuerpoSerpiente" style="grid-area: ${cuerpoSnake[i][1]} / ${cuerpoSnake[i][0]}"></div>`;
    }
    if (
      i !== 0 &&
      cuerpoSnake[0][1] === cuerpoSnake[i][1] &&
      cuerpoSnake[0][0] === cuerpoSnake[i][0]
    ) {
      gameOver = true;
    }
  }
  tablero.innerHTML = htmlMarkup;
};

cambiarPosicionComida();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", cambioDireccion);
