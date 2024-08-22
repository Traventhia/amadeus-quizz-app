// preguntas seteadas desde el main
let questions = [];

//respuestas
let answers = [];
let currentQuestionIndex = 0;

function resetAnswers() {
  currentQuestionIndex = 0;
  answers = [];
}

function showNextQuestion(callback) {
  if (currentQuestionIndex < questions.length) {
    const selectedQuestion = questions[currentQuestionIndex];
    showQuestionModal(selectedQuestion, callback);
  }
}

/**
 *
 * @param {Iterable} selectedQuestion Es un objeto que contiene la pregunta y las opciones
 * @param {Function} callback Funcion que se ejecuta cuando se de click a la respuesta
 */

function showQuestionModal(selectedQuestion, callback) {
  const modal = document.getElementById('questionModal');
  const modalContent = modal.querySelector('.modal-content');

  modal.querySelector('h2').textContent = `Pregunta ${currentQuestionIndex + 1}/${
    questions.length
  }`;
  modal.querySelector('p').textContent = selectedQuestion.question;

  const optionsContainer = modal.querySelector('.options');

  optionsContainer.innerHTML = '';

  // ANIMACION PARA EL MODAL DE PREGUNTAS (ENTRADA)

  // Para el fondo del modal
  modal.classList.add('animate__fadeIn');

  // Para el contenedor de preguntas
  modalContent.classList.add('animate__fadeInUpBig');

  // Eliminar las clases de animacion para poder reutilizarlas cuando se reinicie el juego
  setTimeout(() => {
    modalContent.classList.remove('animate__fadeInUpBig');
    modal.classList.remove('animate__fadeIn');
  }, 1000);

  selectedQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');

    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.className = 'option';

    button.addEventListener('click', () => {
      saveAnswer(index, selectedQuestion);

      /* El uso principal proviene de la funcion showQuestion() del archivo game.js */
      callback();

      /* ANIMACIONES PARA EL MODAL DE PREGUNTAS (SALIDA) */

      // Para el fondo del modal
      modal.classList.add('animate__fadeOut');

      // Para el contenedor de preguntas
      modalContent.classList.add('animate__fadeOutDownBig');

      setTimeout(() => {
        modalContent.classList.remove('animate__fadeOutDownBig');
        modal.classList.remove('animate__fadeOut');
        modal.style.display = 'none';
      }, 800);

      currentQuestionIndex++;
    });
    optionsContainer.appendChild(button);
  });

  modal.style.display = 'flex';
}

function saveAnswer(selectedIndex, questionObj) {
  const answer = {
    question: questionObj.question,
    selectedOption: questionObj.options[selectedIndex],
  };
  answers.push(answer);

  // TODO: Manejar las respuestas guardadas
  if (currentQuestionIndex === questions.length - 1) {
    console.log(JSON.stringify(answers, null, 2));
  }
}
