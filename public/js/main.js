// Encargado de los request a la API
import { getQuestions } from './questions.js';

// Manejador del inicio del juego
const startGame = init;

// Boton de reinicio  del juego
document.getElementById('replayButton').addEventListener('click', () => {
  console.log('Reiniciando juego');
  resetAnswers();
  resetGame();
});

getQuestions((res) => {
  questions = res;
  // console.log(res);
  setTimeout(() => {
    startGame();
  }, 1000);
});
