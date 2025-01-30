document.getElementById('enviar').addEventListener('click', () => {
  let main = document.querySelector('body');
  let message = document.createElement('span');
  message.textContent = '!Gracias por tu mensaje!';
  message.classList.add('enviar');
  main.appendChild(message);
});
