/**
 * Reducer 复制数据变更操作
 */

export default (state, action) => {
  let newState = null
  switch (action.type) {
    case 'todos_add':
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
    case 'todos_delete':
      // 删除任务
      newState = JSON.parse(JSON.stringify(state))
      // 找到需要删除的索引
      let index = newState.todos.findIndex(item => {
        return item.id === action.id
      })

      newState.todos.splice(index, 1)
      return newState

    case 'todos_toggle_item':
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.some(item => {
        if (item.id === action.id) {
          item.done = !item.done
          return true
        }
        return false
      })
      return newState

    case 'todos_toggle_all':
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.forEach(item => {
        item.done = !action.isAll
      })
      return newState

    case 'todos_show_edit_input':
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.some(item => {
        if (item.id === action.id) {
          item.isEdit = !item.isEdit
          return true
        }
        return false
      })
      return newState

    case 'todos_edit_etitle':
      newState = JSON.parse(JSON.stringify(state))
      newState.todos.some(item => {
        if (item.id === action.id) {
          item.etitle = action.value
          return true
        }
        return false
      })
      return newState
    default:
      return state
  }
  // return state
}