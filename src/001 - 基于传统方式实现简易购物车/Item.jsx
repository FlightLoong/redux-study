import React from 'react'

export default class Header extends React.Component {

  state = {
    num: 0
  }

  addNum = () => {
    this.setState({
      num: this.state.num + 1
    })
    
    this.props.allNum(1)
  }

  subNum = () => {
    if (this.state.num <= 0) {
      return
    }

    this.setState({
      num: this.state.num - 1
    })

    this.props.allNum(-1)
  }

  render() {
    return (
      <div>
        <p>
          <span>1. 苹果</span> <span>数量： {this.state.num}</span>&nbsp;&nbsp;&nbsp;
          <button onClick={this.addNum}>+</button>&nbsp;&nbsp;&nbsp;
          <button onClick={this.subNum}>-</button>
        </p>
      </div>
    )
  }
}
