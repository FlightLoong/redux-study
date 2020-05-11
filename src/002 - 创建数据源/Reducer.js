/**
 * 提供数据的修改操作
 * 
 * 不能直接修改 state 数据，需要先复制一份原有数据，修改之后，在返回新的数据即可
 */
import * as ACTIONS from './ActionName'

// 根据 action 的不同修改 state 中对应的数据

// 参数 1、state 表示唯一的数据源
// 参数 2、action 表示视图中触发的 action
export default (state, action) => {
  let newState = null
  switch (action.type) {
    case ACTIONS.ADD_ACTION:
      newState = { ...state }
      newState[action.name] = newState[action.name] + 1
      return newState
      // break;
    case ACTIONS.SUB_ACTION:
      newState = { ...state }
      let num = newState[action.name]
      if (num > 1) {
        newState[action.name] = num - 1
      }
      return newState
      // break;
    default:
      return state
  }
}
