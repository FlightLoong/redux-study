/**
 * Reducer 复制数据变更操作
 */
import * as ActionTypes from './ActionTypes.js'
import * as service from './Service.js'

export default (state, action) => {
  switch (action.type) {
    case ActionTypes.TODOS_ADD:
      // 添加任务
      return service.add(state, action)
    case ActionTypes.TODOS_DELETE:
      // 删除任务
      return service.deleteTask(state, action)

    case ActionTypes.TODOS_TOGGLE_ITEM:
      // 切换单个条目的状态
      return service.toggleItem(state, action)

    case ActionTypes.TODOS_TOGGLE_ALL:
      // 控制所有列表项切换:
      return service.toggleAll(state, action)

    case ActionTypes.TODOS_SHOW_EDIT_INPUT:
      // 显示编辑框
      return service.showEditInput(state, action)

    case ActionTypes.TODOS_EDIT_ETITLE:
      // 编辑任务名称
      return service.editEtile(state, action)

    case ActionTypes.TODOS_TOGGLE_TYPE:
      // 切换筛选条件
      return service.toggleType(state, action)

    case ActionTypes.TODOS_CLEAR_ALL:
      // 清除已完成任务
      return service.clearAll(state, action)

    default:
      return state
  }
}