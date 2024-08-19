// questions
const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'J.K. Rowling'],
  },
  // Añade más preguntas según sea necesario
];
//respuestas
let answers = [];
let currentQuestionIndex = 0;

function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const selectedQuestion = questions[currentQuestionIndex];
    showQuestionModal(selectedQuestion);
  } else {
    console.log('Has completado todas las preguntas.');
    // Aquí puedes agregar lógica para finalizar el juego o mostrar un mensaje de felicitación
  }
}

function showQuestionModal(selectedQuestion) {
  const modal = document.getElementById('questionModal');

  modal.querySelector('h2').textContent = `Pregunta ${currentQuestionIndex + 1}/${
    questions.length
  }`;
  modal.querySelector('p').textContent = selectedQuestion.question;

  const optionsContainer = modal.querySelector('.options');
  optionsContainer.innerHTML = '';
  selectedQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.className = 'option';
    button.addEventListener('click', () => {
      saveAnswer(index, selectedQuestion);
      modal.style.display = 'none';
      currentQuestionIndex++;
    });
    optionsContainer.appendChild(button);
  });

  modal.style.display = 'block';
}

function saveAnswer(selectedIndex, questionObj) {
  const answer = {
    question: questionObj.question,
    selectedOption: questionObj.options[selectedIndex],
  };
  answers.push(answer);
  console.log('Respuesta guardada:', answer);
}
