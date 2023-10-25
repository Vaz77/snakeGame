const tablero = document.querySelector(".tablero");

let comidaX = 13,
  comidaY = 10;
let snakeX = 5,
  snakeY = 10;

const cambiarPosicionComida = () => {
  comidaX = Math.floor(Math.random() * 30) + 1;
  comidaY = Math.floor(Math.random() * 30) + 1;
  console.log(comidaX);
};

const initGame = () => {
  let htmlMarkup = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX}"></div>`;
  // Utilizo += para agregar la serpiente sin sobreescribir la comida
  htmlMarkup += `<div class="cuerpoSerpiente" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

  tablero.innerHTML = htmlMarkup;
};

cambiarPosicionComida();
initGame();
