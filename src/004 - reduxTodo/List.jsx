import React from 'react'
import { connect } from 'react-redux'
import * as Actions from './store/ActionCreate.js'


class List extends React.Component {

  state = {
    isAll: false
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

// 过滤列表数据
function filterList({ todos, currentType }) {
  // let { todos } = this.state
  return todos.filter(item => {
    if (currentType === 'all') {
      // 全部列表
      return true
    } else if (currentType === 'will' && !item.done) {
      // 未完成
      return true
    } else if (currentType === 'done' && item.done) {
      return true
    } else {
      return false
    }
  })
}

function mapStateToProps(state) {
  // every 方法：判断数组中是否所有元素都满足条件，如果都满足就返回 true
  let isAll = state.todos.every(item => {
    return item.done
  })

  let todos = filterList(state)
  return {
    todos,
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
