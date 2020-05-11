import React from 'react'
// 导入组件
import Header from './Header.jsx'
import Item from './Item.jsx'
import Footer from './Footer.jsx'

// 导入 store 数据源
import store from './Store'
// 导入 Provider 组件
import { Provider } from 'react-redux'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header></Header>
          <hr />
          <Item name="apple" allNum={this.allNum}></Item>
          <Item name="banana" allNum={this.allNum}></Item>
          <Item name="orange" allNum={this.allNum}></Item>
          <hr />
          <Footer></Footer>
        </div>
      </Provider>
    )
  }
}
