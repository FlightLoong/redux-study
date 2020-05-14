/**
 * 唯一数据源
 */
import { createStore } from 'redux'
import reducer from './Reducer.js'

let initValue = {
  todos: [
    {
      id: 1,
      etitle: '写代码',
      done: false,
      isEdit: false
    },
    {
      id: 2,
      etitle: '听歌',
      done: true,
      isEdit: false
    }
  ]
}

const store = createStore(reducer, initValue)

export default store
