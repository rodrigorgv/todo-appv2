//aca vamoa a regresar el componente html a crear

import { Todo } from '../models/todo.model';

/**
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error('A TODO object is required');

  //podemos trabajar una desestructuración del todo, de la siguiente manera
  const { done, description, id } = todo;

  //creación del html para este elemento
  const html = `
  <div class="view">
      <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
      <label>${description}</label>
      <button class="destroy"></button>
  </div>
  <input class="edit" value="Create a TodoMVC template">`;

  const liElement = document.createElement('li');
  liElement.setAttribute('data-id', id);
  liElement.innerHTML = html;
  if (done) liElement.classList.add('completed');

  return liElement;
};
