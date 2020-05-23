/**
 * ActionCreator 本质上是函数，用于创建 Action
 * 
 * Action 的本质是一个普通对象
 */
import * as ActionTypes from './ActionTypes.js'

export const addTaskAction = (etitle) => {
  return {
    type: ActionTypes.TODOS_ADD,
    etitle: etitle
  }
}

export const deleteTaskAction = (id) => {
  return {
    type: ActionTypes.TODOS_DELETE,
    id: id
  }
}

export const toggleItemAction = (id) => {
  return {
    type: ActionTypes.TODOS_TOGGLE_ITEM,
    id: id
  }
}

export const toggleAllAction = (isAll) => {
  return {
    type: ActionTypes.TODOS_TOGGLE_ALL,
    isAll
  }
}

export const showEditInputAction = (id) => {
  return {
    type: ActionTypes.TODOS_SHOW_EDIT_INPUT,
    id
  }
}

export const editEtitleAction = (id, value) => {
  return {
    type: ActionTypes.TODOS_EDIT_ETITLE,
    id,
    value
  }
}

export const toggleTypeAction = (type) => {
  return {
    type: ActionTypes.TODOS_TOGGLE_TYPE,
    value: type
  }
}

export const clearAllAction = () => {
  return {
    type: ActionTypes.TODOS_CLEAR_ALL
  }
}
