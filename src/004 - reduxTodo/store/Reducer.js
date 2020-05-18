/**
 * Reducer 复制数据变更操作
 */
import * as ActionTypes from './ActionTypes.js'

export default (state, action) => {
  let newState = null
  switch (action.type) {
    case ActionTypes.TODOS_ADD:
      newState = JSON.parse(JSON.stringify(state))

      let ids = newState.todos.map(item => {
        return item.id
      })

      let maxId = Math.max.apply(null, ids) + 1

      let newTodo = {
        id: maxId,
        etitle: action.etitle,
        done: false,
        isEdit: false
      }

      newState.todos.unshift(newTodo)
      return newState
    case ActionTypes.TODOS_DELETE:
      // 删除任务
      newState = JSON.parse(JSON.stringify(state))
      // 找到需要删除的索引
      let index = newState.todos.findIndex(item => {
        return item.id === action.id
      })

      newState.todos.splice(index, 1)
      return newState

    case ActionTypes.TODOS_TOGGLE_ITEM:
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.some(item => {
        if (item.id === action.id) {
          item.done = !item.done
          return true
        }
        return false
      })
      return newState

    case ActionTypes.TODOS_TOGGLE_ALL:
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.forEach(item => {
        item.done = !action.isAll
      })
      return newState

    case ActionTypes.TODOS_SHOW_EDIT_INPUT:
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.some(item => {
        if (item.id === action.id) {
          item.isEdit = !item.isEdit
          return true
        }
        return false
      })
      return newState

    case ActionTypes.TODOS_EDIT_ETITLE:
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.some(item => {
        if (item.id === action.id) {
          item.etitle = action.value
          return true
        }
        return false
      })
      return newState

    case ActionTypes.TODOS_TOGGLE_TYPE:
      newState = JSON.parse(JSON.stringify(state))
      newState.currentType = action.value

      return newState

    case ActionTypes.TODOS_CLEAR_ALL:
      newState = JSON.parse(JSON.stringify(state))
      // console.log(newState)
      newState.todos = newState.todos.filter(item => {
        return !item.done
      })


      return newState

    default:
      return state
  }
  // return state
}