import React from 'react'
import { connect } from 'react-redux'
import * as Actions from './store/ActionCreate.js'

class List extends React.Component {

  state = {
    isAll: false
  }

  // 删除任务列表
  deleteHandle = (id) => {
    this.props.deleteTask(id)
  }

  // 切换状态
  checkHandle = (id) => {
    this.props.checkTask(id)
  }

  // 状态切换
  toggleAll = () => {
    // 顶部全选按钮
    this.setState({
      isAll: !this.state.isAll
    }, () => {
      // 控制所有的列表的选中状态
      this.props.toggleAllTask(this.state.isAll)
    })
  }

  handleDoubleClick = (id, e) => {
    // 双击之后进入编辑状态
    // 获取label元素的父元素的下一个兄弟元素 input
    let input = e.target.parentNode.nextSibling
    // 调用父组件函数修改任务编辑状态
    this.props.showEditInput(id)
    setTimeout(() => {
      // 页面已经显示input元素之后才控制获取焦点
      input && input.focus()
    }, 0)
  }

  handleEditEtile = (id, e) => {
    // 控制数组中对应标题的变化
    this.props.editTask(id, e.target.value)
  }

  // 渲染 todolist 列表
  todoTags = () => {
    const { todos, deleteTask, toggleItem, showEditInput, editEtitle } = this.props
    return todos.map(item => (
      <li key={item.id} className={[item.done ? 'completed' : '', item.isEdit ? 'editing' : ''].join(' ')}>
        <div className="view" onDoubleClick={(e) => showEditInput(item.id, e)}>
          <input checked={item.done} onChange={() => toggleItem(item.id)} className="toggle" type="checkbox" />
          <label>{item.etitle}</label>
          <button onClick={() => deleteTask(item.id)} className="destroy"></button>
        </div>
        <input value={item.etitle} className="edit" onChange={(e) => editEtitle(item.id, e)} onBlur={(e) => showEditInput(item.id, e)} />
      </li>
    ))
  }

  render() {
    // const { isAll } = this.state
    const { isAll, toggleAll } = this.props
    return (
      <div>
        <section className="main">
          <input defaultChecked={isAll} id="toggle-all" className="toggle-all" type="checkbox" />
          <label onClick={() => toggleAll(isAll)} htmlFor="toggle-all">全部标记为完成</label>
          <ul className="todo-list">
            {this.todoTags()}
          </ul>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // every 方法：判断数组中是否所有元素都满足条件，如果都满足就返回 true
  let isAll = state.todos.every(item => {
    return item.done
  })
  return {
    todos: state.todos,
    // 从唯一的数据源中获取状态数据即可
    isAll
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // 生成一个删除任务的 action
    deleteTask: (id) => {
      // console.log(e.target.dataset.id)
      // 生成一个删除任务的 action
      // let id = e.target.dataset.id
      let action = Actions.deleteTaskAction(id)
      // 分发 action
      dispatch(action)
    },

    // 生成一个切换任务状态的 action
    toggleItem: (id) => {
      let action = Actions.toggleItemAction(id)
      dispatch(action)
    },

    // 生成一个切换全选反选的 action
    toggleAll: (isAll) => {
      let action = Actions.toggleAllAction(isAll)
      dispatch(action)
    },

    // 展示编辑框 action
    showEditInput: (id, e) => {
      let action = Actions.showEditInputAction(id)
      dispatch(action)

      let input = e.target.parentNode.nextSibling

      setTimeout(() => {
        // 页面已经显示input元素之后才控制获取焦点
        input && input.focus()
      }, 0)
    },

    // 重新编辑任务 action
    editEtitle: (id, e) => {
      let value = e.target.value
      let action = Actions.editEtitleAction(id, value)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
