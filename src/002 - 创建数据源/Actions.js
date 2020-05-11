/**
 * 产生 Action
 * 
 * action 的本质就是一个对象，该对象描述了一个操作行为
 */
import * as ACTIONS from './ActionName'

export const add = (production) => {
  return {
    type: ACTIONS.ADD_ACTION,
    name: production
  }
}

export const sub = (production) => {
  return {
    type: ACTIONS.SUB_ACTION,
    name: production
  }
}
