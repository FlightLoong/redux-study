import React from 'react'
// connect 的作用： 将 store 中的数据连接到 view 组件中
import { connect } from 'react-redux'
// 导入 actions
import * as Actions from './Actions'

class Header extends React.Component {
  render() {
    const { num, name, addNum, subNum } = this.props
    return (
      <div>
        <p>
          <span>{name}</span> <span>数量： {num}</span>&nbsp;&nbsp;&nbsp;
          <button onClick={addNum}>+</button>&nbsp;&nbsp;&nbsp;
          <button onClick={subNum}>-</button>
        </p>
      </div>
    )
  }
}

// 封装一个方法，将 store 中的数据映射到 view 组件中
// 参数一： 表示唯一的数据源
// 参数二： 表示组件本身的 props
function mapStateToProps(state, ownProps) {
  console.log(ownProps.name)
  // 获取商品名称
  let name = ownProps.name
  // 根据商品的名称获取 state 中对应的数量
  let num = state[name]
  return {
    num, name
  }
}

// 处理事件：把事件处理函数映射到 view 组件中
// 参数 1： 用于进行 action 分发
// 参数 2： 表示组件本身的 props 属性
function mapDispatchToProps(dispatch, ownProps) {
  return {
    addNum: () => {
      let action = Actions.add(ownProps.name)
      dispatch(action)
    },
    subNum: () => {
      let action = Actions.sub(ownProps.name)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
