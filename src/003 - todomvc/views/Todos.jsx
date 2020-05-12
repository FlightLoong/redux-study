import React from 'react'
// 导入 todoList 默认的样式
import '../../../node_modules/todomvc-common/base.css'
import '../../../node_modules/todomvc-app-css/index.css'

class Todos extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isAll: false,
      etitle: '',
      todos: [
        {
          id: 1,
          etitle: '写代码',
          done: false
        },
        {
          id: 2,
          etitle: '听音乐',
          done: true
        }
      ]
    }

    this.focusFef = React.createRef()
  }

  componentDidMount() {
    // 自定义光标聚焦
    this.focusFef.current.focus()
  }

  // 输入最新的任务
  onKeyUpHandle = (e) => {
    if (e.keyCode === 13) {
      let ids = this.state.todos.map(item => {
        return item.id
      })

      // 获取 Id 的最大值
      let maxId = Math.max.apply(null, ids) + 1

      let newTodo = {
        id: maxId,
        etitle: this.state.etitle,
        done: false
      }

      this.setState({
        todos: [newTodo, ...this.state.todos],
        etitle: ''
      })
    }
  }

  // 获取最新输入的任务
  valueChange = (e) => {
    this.setState({
      etitle: e.target.value
    })
  }

  // 删除任务
  deleteTodo = (id) => {
    let todos = [...this.state.todos]
    let index = todos.findIndex(item => {
      return item.id === id
    })

    // 根据索引删除数组的元素
    todos.splice(index, 1)
    this.setState({
      todos
    })
  }

  // 全部标记已经完成
  handleCheckAll = () => {
    this.setState((state) => {
      return {
        isAll: !state.isAll
      }
    }, () => {
      let todos = [...this.state.todos]
      todos.forEach(item => {
        item.done = this.state.isAll
      })

      this.setState({
        todos
      })
    })
  }

  // 切换状态
  handleCheck = (id) => {
    let todos = [...this.state.todos]
    todos.some(item => {
      if (item.id === id) {
        item.done = !item.done
        // 终止遍历
        return true
      }
      return false
    })

    this.setState({
      todos
    })
  }

  // 渲染 todolist 列表
  todoTags = () => {
    return this.state.todos.map(item => (
      <li key={item.id} className={item.done ? 'completed' : ''}>
        <div className="view">
          <input onChange={() => this.handleCheck(item.id)} checked={item.done} className="toggle" type="checkbox" />
          <label>{item.etitle}</label>
          <button onClick={() => this.deleteTodo(item.id)} className="destroy"></button>
        </div>
        <input className="edit" />
      </li>
    ))
  }

  render() {
    const { etitle } = this.state
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input value={etitle} onChange={this.valueChange} onKeyUp={this.onKeyUpHandle} className="new-todo" placeholder="你想做什么 ?" ref={this.focusFef} />
          </header>

          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label onClick={this.handleCheckAll} htmlFor="toggle-all">全部标记为完成</label>
            <ul className="todo-list">
              {this.todoTags()}
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
