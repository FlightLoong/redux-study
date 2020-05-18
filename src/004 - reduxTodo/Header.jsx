import React from 'react'

export default class Header extends React.Component {
  render() {
    const { addTask } = this.props
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input onKeyUp={addTask} placeholder="你想做什么 ?" className="new-todo" autoFocus />
        </header>
      </div>
    )
  }
}
