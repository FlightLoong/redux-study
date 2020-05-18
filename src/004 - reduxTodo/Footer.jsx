import React from 'react'

export default class Footer extends React.Component {
  render() {
    let { num, currentType, toggleType, clearAll } = this.props
    // let { currentType } = this.state
    return (
      <div>
        <footer className="footer">
          <span className="todo-count">剩余 <strong>{num}</strong> 个任务</span>
          <ul onClick={toggleType} className="filters">
            <li>
              <a data-type='all' className={currentType === 'all' ? 'selected' : ''} href="#/">全选</a>
            </li>
            <li>
              <a data-type='will' className={currentType === 'will' ? 'selected' : ''} href="#/active">未完成</a>
            </li>
            <li>
              <a data-type='done' className={currentType === 'done' ? 'selected' : ''} href="#/completed">已完成</a>
            </li>
          </ul>
          <button onClick={clearAll} className="clear-completed">清除所有已完成任务</button>
        </footer>
      </div>
    )
  }
}
