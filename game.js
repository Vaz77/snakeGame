const tablero = document.querySelector(".tablero");

let comidaX = 13,
  comidaY = 10;
let snakeX = 5,
  snakeY = 10;
let velocidadX = 0,
  velocidadY = 0;

const cambiarPosicionComida = () => {
  comidaX = Math.floor(Math.random() * 30) + 1;
  comidaY = Math.floor(Math.random() * 30) + 1;
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
  initGame();
};

const initGame = () => {
  let htmlMarkup = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX}"></div>`;
  snakeX += velocidadX;
  snakeY += velocidadY; // y = 10 - 1 = 9
  // Utilizo += para agregar la serpiente sin sobreescribir la comida
  htmlMarkup += `<div class="cuerpoSerpiente" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

  tablero.innerHTML = htmlMarkup;
};

cambiarPosicionComida();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", cambioDireccion);
initGame();
