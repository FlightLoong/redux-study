import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// 导入组件
// import App from './002 - 创建数据源/App.jsx'

import Todos from './003 - todomvc/react拆分/Todos.jsx'

function App () {
  return (
    <div>
      <Todos></Todos>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))