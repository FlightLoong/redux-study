import React from 'react'
import { connect } from 'react-redux'
// 导入 action
import * as Actions from './store/ActionCreate.js'

class Header extends React.Component {

  state = {
    etitle: ''
  }

  // // 输入最新的任务
  // onKeyUpHandle = (e) => {
  //   if (e.keyCode === 13) {
  //     this.props.addTask(this.state.etitle)

  //     this.setState({
  //       etitle: ''
  //     })
  //   }
  // }

  // // 获取最新输入的任务
  // valueChange = (e) => {
  //   this.setState({
  //     etitle: e.target.value
  //   })
  // }

  render() {
    const { addTask } = this.props
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input onKeyUp={addTask} placeholder="你想做什么 ?" className="new-todo" autoFocus />
        </header>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTask: (e) => {
      if (e.keyCode === 13) {
        // 1、创建添加任务的 Action
        let action = Actions.addTaskAction(e.target.value)
        // 将 Actions 分发出去
        dispatch(action)

        // 将输入框内容清空
        e.target.value = ''
      }
    }
  }
}

// connect 参数 1： 用于向组件提供 props 数据
// connect 参数 2： 用于向组件提供事件处理函数
export default connect(null, mapDispatchToProps)(Header)
