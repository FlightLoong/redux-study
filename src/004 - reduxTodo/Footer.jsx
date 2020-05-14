import React from 'react'

export default class Footer extends React.Component {
  state = {
    currentType: 'all'
  }

  // 筛选
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
    // 对列表数据进行过滤
    this.props.handleFilter(id)
  }

  // 清除所有
  handleClearAll = () => {
    // 清除所有的已完成任务
    this.props.clearAll()
  }

  render() {
    let { num } = this.props
    let { currentType } = this.state
    return (
      <div>
        <footer className="footer">
          <span className="todo-count">剩余 <strong>{num}</strong> 个任务</span>
          <ul onClick={this.handleFilter} className="filters">
            <li>
              <a data-id='all' className={currentType === 'all' ? 'selected' : ''} href="#/">全选</a>
            </li>
            <li>
              <a data-id='will' className={currentType === 'will' ? 'selected' : ''} href="#/active">未完成</a>
            </li>
            <li>
              <a data-id='done' className={currentType === 'done' ? 'selected' : ''} href="#/completed">已完成</a>
            </li>
          </ul>
          <button onClick={this.handleClearAll} className="clear-completed">清除所有已完成任务</button>
        </footer>
      </div>
    )
  }
}
