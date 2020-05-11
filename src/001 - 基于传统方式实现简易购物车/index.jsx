import React from 'react'
// 导入组件
import Header from './Header.jsx'
import Item from './Item.jsx'
import Footer from './Footer.jsx'

export default class App extends React.Component {
  state = {
    num: 0
  }

  allNum = (params) => {
    this.setState({
      num: this.state.num + params
    })
  }

  render() {
    return (
      <div>
        <Header></Header>
        <hr />
        <Item allNum={this.allNum}></Item>
        <Item allNum={this.allNum}></Item>
        <Item allNum={this.allNum}></Item>
        <hr />
        <Footer count={this.state.num}></Footer>
      </div>
    )
  }
}
