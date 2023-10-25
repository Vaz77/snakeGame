const tablero = document.querySelector(".tablero");

let comidaX = 13,
  comidaY = 10;

const cambiarPosicionComida = () => {
  comidaX = Math.floor(Math.random() * 30) + 1;
  comidaY = Math.floor(Math.random() * 30) + 1;
  console.log(comidaX);
};

const initGame = () => {
  let htmlMarkup = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX}"></div>`;
  tablero.innerHTML = htmlMarkup;
};

cambiarPosicionComida();
initGame();
