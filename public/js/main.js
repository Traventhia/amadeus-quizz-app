// Encargado de los request a la API
import { getQuestions } from './questions.js';

// Variables globales
import { API_URL } from './var.env.js';

// Manejador del inicio del juego
const startGame = init;

// Preguntar por la API para usarla no se liberará en un archivo publico
let dataApi = API_URL;

// Boton de reinicio  del juego
document.getElementById('replayButton').addEventListener('click', () => {
  console.log('Reiniciando juego');
  resetAnswers();
  resetGame();
});

getQuestions(dataApi, (res) => {
  questions = res;
  // console.log(res);
  setTimeout(() => {
    startGame();
  }, 1000);
});
