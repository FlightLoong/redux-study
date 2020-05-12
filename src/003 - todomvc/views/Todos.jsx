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
      currentType: 'all',
      todos: [
        {
          id: 1,
          etitle: '写代码',
          done: false,
          isEdit: false
        },
        {
          id: 2,
          etitle: '听音乐',
          done: true,
          isEdit: false
        }
      ]
    }

    this.focusRef = React.createRef()
  }

  componentDidMount() {
    // 自定义光标聚焦
    this.focusRef.current.focus()
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
        done: false,
        isEdit: false
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

  // 双击任务列表
  handleDoubleClick = (id, e) => {
    console.log(e)
    let input = e.target.parentNode.nextSibling
    // e.persist()
    setTimeout(() => {
      input && input.focus()
    }, 0)
    // 双击进入编辑状态;或者失去焦点是，取消编辑状态
    let todos = [...this.state.todos]
    todos.some(item => {
      if (item.id === id) {
        // 找到后把对应isEdit状态取反
        item.isEdit = !item.isEdit
        // 终止继续遍历
        return true
      }
      return false
    })
    this.setState({
      todos: todos
    })
  }

  // 完成任务的编辑
  handleEditEtile = (id, e) => {
    // 控制数组中对应标题的变化
    let todos = [...this.state.todos]
    todos.some(item => {
      if (item.id === id) {
        // 把最新的输入内容进行更新
        item.etitle = e.target.value
        return true
      }
      return false
    })
    this.setState({
      todos: todos
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

  // 计算数量
  handleCount = () => {
    // 计算剩余的没有完成的任务数量
    let num = 0
    this.state.todos.forEach(item => {
      if (!item.done) {
        // 没有完成的任务
        num += 1
      }
    })
    return num
  }

  // 获取选中的值
  handleFilter = (e) => {
    // 更新当前的筛选条件
    let id = e.target.dataset.id
    if (!id) {
      // 没有id，什么都不做
      return 
    }
    this.setState({
      currentType: id
    })
  }

  // 筛选数据
  handleFilterData = () => {
    let { todos, currentType } = this.state
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

  // 清除已完成的
  handleClearAll = () => {
    // 清除所有的已完成任务
    let todos = this.state.todos.filter(item => {
      return !item.done
    })
    this.setState({
      todos: todos
    })
  }

  // 渲染 todolist 列表
  todoTags = () => {
    let todos = this.handleFilterData()
    return todos.map(item => (
      <li key={item.id} className={[item.done ? 'completed' : '', item.isEdit ? 'editing' : ''].join(' ')}>
        <div className="view" onDoubleClick={this.handleDoubleClick.bind(this, item.id)}>
          <input onChange={() => this.handleCheck(item.id)} checked={item.done} className="toggle" type="checkbox" />
          <label>{item.etitle}</label>
          <button onClick={() => this.deleteTodo(item.id)} className="destroy"></button>
        </div>
        <input className="edit" value={item.etitle} onChange={this.handleEditEtile.bind(this, item.id)} onBlur={this.handleDoubleClick.bind(this, item.id)} />
      </li>
    ))
  }

  render() {
    const { etitle, currentType } = this.state
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input value={etitle} onChange={this.valueChange} onKeyUp={this.onKeyUpHandle} className="new-todo" placeholder="你想做什么 ?" ref={this.focusRef} />
          </header>

          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label onClick={this.handleCheckAll} htmlFor="toggle-all">全部标记为完成</label>
            <ul className="todo-list">
              {this.todoTags()}
            </ul>
          </section>

          <footer className="footer">
            <span className="todo-count">剩余 <strong>{this.handleCount()}</strong> 个任务</span>
            <ul onClick={this.handleFilter} className="filters">
              <li>
                <a data-id='all' className={currentType==='all'?'selected': ''} href="#/">全选</a>
              </li>
              <li>
                <a data-id='will' className={currentType==='will'?'selected': ''}  href="#/active">未完成</a>
              </li>
              <li>
                <a data-id='done' className={currentType==='done'?'selected': ''}  href="#/completed">已完成</a>
              </li>
            </ul>
            <button onClick={this.handleClearAll} className="clear-completed">清除</button>
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
