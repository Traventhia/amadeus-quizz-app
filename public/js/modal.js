// preguntas seteadas desde el main
let questions = [];

//respuestas
let answers = [];
let currentQuestionIndex = 0;

let destinationData = [];

// Cargar datos desde el archivo JSON
fetch('public/js/destinationData.json')
  .then((response) => response.json())
  .then((data) => {
    destinationData = data;
  })
  .catch((error) => {
    console.error('Error al cargar el archivo JSON:', error);
  });

// Función para normalizar cadenas
function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

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
    questionId: questionObj.id,
    selectedOption: questionObj.options[selectedIndex],
  };
  answers.push(answer);

  if (currentQuestionIndex === questions.length - 1) {
    getRecommendations(); // Generar las recomendaciones basadas en las respuestas
    showRecommendationsModal(); // Mostrar el modal con las recomendaciones
    // console.log(JSON.stringify(answers)); //Respuestas del usuario
  }
}

function showRecommendationsModal() {
  const modal = document.getElementById('recommendationsModal');
  modal.style.display = 'flex';
}

function getRecommendations() {
  // Mapeo de las respuestas en un objeto para un acceso más fácil
  const answersMap = answers.reduce((map, answer) => {
    map[answer.questionId] = answer.selectedOption;
    return map;
  }, {});

  const destinationType = normalizeString(answersMap['1'] || ''); // '1' es el id de la pregunta sobre el tipo de entorno
  const climate = normalizeString(answersMap['2'] || ''); // '3' es el id de la pregunta sobre el clima
  const activity = normalizeString(answersMap['3'] || ''); // '5' es el id de la pregunta sobre las actividades
  const accommodation = normalizeString(answersMap['4'] || ''); // '7' es el id de la pregunta sobre el alojamiento
  const duration = normalizeString(answersMap['5'] || ''); // '9' es el id de la pregunta sobre la duración
  const age = normalizeString(answersMap['6'] || ''); // '11' es el id de la pregunta sobre la edad

  // Buscar la combinación de respuestas y normalizar los datos JSON
  const result = destinationData.find(
    (dest) =>
      normalizeString(dest.preferenceDestination) === destinationType &&
      normalizeString(dest.climate) === climate &&
      normalizeString(dest.activity) === activity &&
      normalizeString(dest.accommodation) === accommodation &&
      normalizeString(dest.duration) === duration &&
      normalizeString(dest.age) === age,
  );

  const nationalDestination = result ? result.national : 'Bora Bora, Polinesia Francesa';
  const internationalDestination = result
    ? result.international
    : 'Dubái, Emiratos Árabes';

  document.getElementById('national-destination').textContent =
    `Destino Nacional: ${nationalDestination}`;
  document.getElementById('international-destination').textContent =
    `Destino Internacional: ${internationalDestination}`;
}
