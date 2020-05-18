import React from 'react'
import { connect } from 'react-redux'
import * as Actions from './store/ActionCreate.js'

class Footer extends React.Component {
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

function mapStateToProps (state) {
  let num = 0
  state.todos.forEach(item => {
    if (!item.done) {
      num += 1
    }
  })
  return {
    num,
    currentType: state.currentType
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleType: (e) => {
      let type = e.target.dataset.type
      let action = Actions.toggleTypeAction(type)
      // console.log(action)
      dispatch(action)
    },

    clearAll: () => {
      let action = Actions.clearAllAction()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
