import React from 'react'

export default class List extends React.Component {

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
    const { todos } = this.props
    return todos.map(item => (
      <li key={item.id} className={[item.done ? 'completed' : '', item.isEdit ? 'editing' : ''].join(' ')}>
        <div className="view" onDoubleClick={this.handleDoubleClick.bind(this, item.id)}>
          <input checked={item.done} onChange={() => this.checkHandle(item.id)} className="toggle" type="checkbox" />
          <label>{item.etitle}</label>
          <button onClick={() => this.deleteHandle(item.id)} className="destroy"></button>
        </div>
        <input value={item.etitle} className="edit" onChange={this.handleEditEtile.bind(this, item.id)} onBlur={this.handleDoubleClick.bind(this, item.id)} />
      </li>
    ))
  }

  render() {
    const { isAll } = this.state
    return (
      <div>
        <section className="main">
          <input defaultChecked={isAll} id="toggle-all" className="toggle-all" type="checkbox" />
          <label onClick={this.toggleAll} htmlFor="toggle-all">全部标记为完成</label>
          <ul className="todo-list">
            {this.todoTags()}
          </ul>
        </section>
      </div>
    )
  }
}
