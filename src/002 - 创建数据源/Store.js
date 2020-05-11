/**
 * 唯一的数据源
 */
import { createStore } from 'redux'
// reducer 主要是对数据的处理, 因为逻辑比较多
// 为了方便维护，抽取成一个单独的文件
import reducer from './Reducer.js'

// 提供初始的数据源
let initValue = {
  apple: 1,
  banana: 1,
  orange: 1
}

// 创建数据源
// createStore 方法有两个作用
//  1、 存储数据   2、修改数据
// createStore 方法有两个参数
//  1、用于处理数据修改
//  2、用于提供初始化数据
const store = createStore(reducer, initValue)

export default store
