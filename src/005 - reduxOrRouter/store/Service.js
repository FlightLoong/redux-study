/*
  数据变更业务处理
*/
export const add = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  let ids = newState.todos.map(item => {
    return item.id
  })

  let maxId = Math.max.apply(null, ids) + 1

  if (ids.length === 0) {
    // 默认没有数据
    maxId = 1
  }

  let newTodo = {
    id: maxId,
    etitle: action.etitle,
    done: false,
    isEdit: false
  }

  newState.todos.unshift(newTodo)
  return newState
}

export const deleteTask = (state, action) => {
  // 删除任务
  let newState = JSON.parse(JSON.stringify(state))
  // 找到需要删除的索引
  let index = newState.todos.findIndex(item => {
    return item.id === action.id
  })

  newState.todos.splice(index, 1)
  return newState
}

export const toggleItem = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  newState.todos.some(item => {
    if (item.id === action.id) {
      item.done = !item.done
      return true
    }
    return false
  })
  return newState
}

export const toggleAll = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  newState.todos.forEach(item => {
    item.done = !action.isAll
  })
  return newState

}

export const showEditInput = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  newState.todos.some(item => {
    if (item.id === action.id) {
      item.isEdit = !item.isEdit
      return true
    }
    return false
  })
  return newState
}

export const editEtile = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  newState.todos.some(item => {
    if (item.id === action.id) {
      item.etitle = action.value
      return true
    }
    return false
  })
  return newState
}

export const toggleType = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  newState.currentType = action.value

  return newState
}

export const clearAll = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  // console.log(newState)
  newState.todos = newState.todos.filter(item => {
    return !item.done
  })


  return newState
}
