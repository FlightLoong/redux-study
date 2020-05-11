import React from 'react'
// connect 的作用： 将 store 中的数据连接到 view 组件中
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {
    const { total } = this.props
    return (
      <div>
        <p>总数量： {total} 件 </p>
      </div>
    )
  }
}

// 封装一个方法，将 store 中的数据映射到 view 组件中
function mapStateToProps(state) {
  // state 参数其实就是 store 中全部的数据
  let total = 0

  for (let key in state) {
    let v = state[key]
    total += v
  }

  return {
    total: total
  }
}

export default connect(mapStateToProps)(Header)
