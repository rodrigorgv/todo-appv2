import { createTodoHTML } from '.';
import { Todo } from '../models/todo.model';

let element;

/**
 * @param {String} elementId
 * @param {Todo} todos
 */
export const renderTodos = (elementId, todos = []) => {
  //creamos el elemento html a renderizar
  if (!element) element = document.querySelector(elementId);
  //esta validacion sirve en caso de que se haya mandado un id invalido
  if (!element) throw new Error(`Element ${elementId} not found`);

  element.innerHTML = '';

  todos.forEach((todo) => {
    element.append(createTodoHTML(todo));
  });
};
