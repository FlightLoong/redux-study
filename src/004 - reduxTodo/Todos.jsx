import React from 'react'

// 导入组件
import Header from './Header.jsx'
import List from './List.jsx'
import Footer from './Footer.jsx'

// 导入 todoList 默认的样式
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

class Todos extends React.Component {
  render() {
    return (
      <div>
        <section className="todoapp">
          <Header></Header>
          <List></List>
          <Footer></Footer>
        </section>
      </div>
    )
  }
}

export default Todos
