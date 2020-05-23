import { connect } from 'react-redux'
// 导入 action
import * as Actions from '../store/ActionCreate.js'
import Header from '../Header.jsx'

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
