/**
 * ActionCreator 本质上是函数，用于创建 Action
 * 
 * Action 的本质是一个普通对象
 */

export const addTaskAction = (etitle) => {
  return {
    type: 'todos_add',
    etitle: etitle
  }
}

export const deleteTaskAction = (id) => {
  return {
    type: 'todos_delete',
    id: id
  }
}

export const toggleItemAction = (id) => {
  return {
    type: 'todos_toggle_item',
    id: id
  }
}

export const toggleAllAction = (isAll) => {
  return {
    type: 'todos_toggle_all',
    isAll
  }
}

export const showEditInputAction = (id) => {
  return {
    type: 'todos_show_edit_input',
    id
  }
}

export const editEtitleAction = (id, value) => {
  return {
    type: 'todos_edit_etitle',
    id,
    value
  }
}
