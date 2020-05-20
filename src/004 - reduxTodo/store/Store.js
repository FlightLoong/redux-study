/**
 * 唯一数据源
 */
import { createStore } from 'redux'
import reducer from './Reducer.js'

let initValue = {
  currentType: 'all',
  todos: []
}

let todos = localStorage.getItem('todos')
if (todos) {
  initValue = JSON.parse(todos)
}

const store = createStore(reducer, initValue)

store.subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(store.getState()))
})

export default store
