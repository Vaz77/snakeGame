const tablero = document.querySelector(".tablero");

let comidaX = 13,
  comidaY = 10;
let snakeX = 5,
  snakeY = 10;
let velocidadX = 0,
  velocidadY = 0;
let cuerpoSnake = [];

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
  for (let i = cuerpoSnake.length - 1; i > 0; i--) {
    cuerpoSnake[i] = cuerpoSnake[i - 1];
  }
  // Comprueba si la cabeza de la serpiente coincide con la comida antes de actualizar el cuerpo.
  if (snakeX === comidaX && snakeY === comidaY) {
    cambiarPosicionComida();
    cuerpoSnake.push([comidaX, comidaY]);
  }
  cuerpoSnake[0] = [snakeX, snakeY];
  snakeX += velocidadX;
  snakeY += velocidadY; // y = 10 - 1 = 9
  for (let i = 0; i < cuerpoSnake.length; i++) {
    if (i === 0) {
      htmlMarkup += `<div class="cabeza" style="grid-area: ${cuerpoSnake[i][1]} / ${cuerpoSnake[i][0]}"></div>`;
    } else {
      htmlMarkup += `<div class="cuerpoSerpiente" style="grid-area: ${cuerpoSnake[i][1]} / ${cuerpoSnake[i][0]}"></div>`;
    }
  }
  // Utilizo += para agregar la serpiente sin sobreescribir la comida
  htmlMarkup += `<div class="cuerpoSerpiente" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
  tablero.innerHTML = htmlMarkup;
};

cambiarPosicionComida();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", cambioDireccion);
