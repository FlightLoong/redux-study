import React from 'react'

export default class Header extends React.Component {

  state = {
    etitle: ''
  }

  // 输入最新的任务
  onKeyUpHandle = (e) => {
    if (e.keyCode === 13) {
      this.props.addTask(this.state.etitle)

      this.setState({
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

  render() {
    const { etitle } = this.state
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input value={etitle} onChange={this.valueChange} onKeyUp={this.onKeyUpHandle} placeholder="你想做什么 ?" className="new-todo" autoFocus />
        </header>
      </div>
    )
  }
}
