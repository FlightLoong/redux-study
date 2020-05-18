import React from 'react'

export default class List extends React.Component {
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
