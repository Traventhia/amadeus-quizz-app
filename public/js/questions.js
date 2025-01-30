/**
 *
 * @param {string} url Link de la API de preguntas
 * @param {Function} callback Es la funcion que se ejecuta cuando se obtiene la respuesta de la API, recibe un parametro que es la respuesta de la API
 * @returns {JSON} El callback lleva como parametro la respuesta de la API
 * @example getQuestions('https://api.com/questions', (res) => { console.log(res) });
 */

export async function getQuestions(callback) {
  fetch('/js/questions.json')
    .then((response) => response.json())
    .then((res) => {
      callback(res);
    })
    .catch((error) => {
      console.error(error);
    });
}
