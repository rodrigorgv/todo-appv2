import { Todo } from '../todos/models/todo.model';

export const Filters = {
  All: 'All',
  Completed: 'Completed',
  Pending: 'Pending',
};

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra del campo'),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log('InitStore 🍕');
};

const loadStore = () => {
  if (!localStorage.getItem('state')) return;

  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem('state')
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
};

//si no especifica un filtro, se toma como defecto el all
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      //con el spread operator retornamos todos los elementos como un array
      return [...state.todos];
    case Filters.Completed:
      //el filter retorna un arreglo
      //barremos los elementod del todo, buscando los que tienen todo.done como true
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`option ${filter} is not valid`);
  }
};

/**
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) throw new Error('Description is required');
  state.todos.push(new Todo(description));
  saveStateToLocalStorage();
};

/**
 * @param {String} todoId todo identifier
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      //aca se hace la negacion del valor
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStorage();
};

/**
 * @param {String} todoId todo identifier
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateToLocalStorage();
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStateToLocalStorage();
};

/**
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  const arrayFiltros = Object.keys(Filters);
  console.log('setfilter: ', newFilter);
  if (arrayFiltros.includes(newFilter)) {
    state.filter = newFilter;
  } else {
    throw new Error('filtro invalido');
  }
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
