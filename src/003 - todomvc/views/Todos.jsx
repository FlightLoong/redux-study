import React from 'react'
// 导入 todoList 默认的样式
import '../../../node_modules/todomvc-common/base.css'
import '../../../node_modules/todomvc-app-css/index.css'

class Todos extends React.Component {
  render() {
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="你想做什么 ?" autoFocus />
          </header>

          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              <li className="completed">
                <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label>吃饭</label>
                  <button className="destroy"></button>
                </div>
                <input className="edit" />
              </li>
              <li>
                <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label>喝水</label>
                  <button className="destroy"></button>
                </div>
                <input className="edit"  />
              </li>
            </ul>
          </section>

          <footer className="footer">
            <span className="todo-count">剩余 <strong>0</strong> 个任务</span>
            <ul className="filters">
              <li>
                <a className="selected" href="#/">全选</a>
              </li>
              <li>
                <a href="#/active">未完成</a>
              </li>
              <li>
                <a href="#/completed">已完成</a>
              </li>
            </ul>
            <button className="clear-completed">清除</button>
          </footer>
        </section>

        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
          <p>Created by <a href="http://todomvc.com">you</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    )
  }
}

export default Todos
