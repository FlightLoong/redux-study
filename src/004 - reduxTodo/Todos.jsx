import React from 'react'

// 导入组件
import Header from './Header.jsx'
import List from './List.jsx'
import Footer from './Footer.jsx'

// 导入 todoList 默认的样式
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

class Todos extends React.Component {
  state = {
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

  // 添加任务
  addTask = (params) => {
    let ids = this.state.todos.map(item => {
      return item.id
    })

    let maxId = Math.max.apply(null, ids) + 1

    console.log(params)
    let newTodo = {
      id: maxId,
      etitle: params,
      done: false,
      isEdit: false
    }

    this.setState({
      todos: [newTodo, ...this.state.todos]
    })
  }

  // 删除任务
  deleteTask = (id) => {
    let newTodos = [...this.state.todos]
    let index = newTodos.findIndex(item => {
      return item.id === id
    })

    newTodos.splice(index, 1)

    this.setState({
      todos: newTodos
    })
  }

  // 切换状态
  checkTask = (id) => {
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

  // 全选与全不选
  toggleAllTask = (status) => {
    let newTodos = [...this.state.todos]

    newTodos.forEach(item => {
      item.done = status
    })

    this.setState({
      todos: newTodos
    })
  }

  // 展示编辑输入框
  showEditInput = (id) => {
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

  // 编辑成功
  editTask = (id, value) => {
    // 编辑任务
    let todos = [...this.state.todos]
    todos.some(item => {
      if (item.id === id) {
        // 把最新的输入内容进行更新
        item.etitle = value
        return true
      }
      return false
    })
    this.setState({
      todos: todos
    })
  }

  // 从子组件将条件传递到父组件
  handleFilter = (currentType) => {
    this.setState({
      currentType: currentType
    })
  }

  // 过滤列表数据
  filterList = (currentType) => {
    let { todos } = this.state
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

  // 清除所有已完成任务
  clearAll = () => {
    let todos = this.state.todos.filter(item => {
      return !item.done
    })
    this.setState({
      todos: todos
    })
  }

  // 计算剩余的没有完成的任务数量
  handleCount = () => {
    let num = 0
    this.state.todos.forEach(item => {
      if (!item.done) {
        // 没有完成的任务
        num += 1
      }
    })
    return num
  }

  render() {
    let { todos, currentType } = this.state
    // 更加当前条件过来出列表数据
    todos = this.filterList(currentType)
    return (
      <div>
        <section className="todoapp">
          <Header addTask={this.addTask}></Header>
          <List editTask={this.editTask} showEditInput={this.showEditInput} toggleAllTask={this.toggleAllTask} deleteTask={this.deleteTask} checkTask={this.checkTask} todos={todos}></List>
          <Footer clearAll={this.clearAll} handleFilter={this.handleFilter} num={this.handleCount()}></Footer>
        </section>
      </div>
    )
  }
}

export default Todos
