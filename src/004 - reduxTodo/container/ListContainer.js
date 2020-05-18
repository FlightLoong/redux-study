import { connect } from 'react-redux'
import * as Actions from '../store/ActionCreate.js'
import List from '../List.jsx'


// 过滤列表数据
function filterList({ todos, currentType }) {
  // let { todos } = this.state
  return todos.filter(item => {
    if (currentType === 'all') {
      // 全部列表
      return true
    } else if (currentType === 'will' && !item.done) {
      // 未完成
      return true
    } else if (currentType === 'done' && item.done) {
      return true
    } else {
      return false
    }
  })
}

function mapStateToProps(state) {
  // every 方法：判断数组中是否所有元素都满足条件，如果都满足就返回 true
  let isAll = state.todos.every(item => {
    return item.done
  })

  let todos = filterList(state)
  return {
    todos,
    // 从唯一的数据源中获取状态数据即可
    isAll
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // 生成一个删除任务的 action
    deleteTask: (id) => {
      // console.log(e.target.dataset.id)
      // 生成一个删除任务的 action
      // let id = e.target.dataset.id
      let action = Actions.deleteTaskAction(id)
      // 分发 action
      dispatch(action)
    },

    // 生成一个切换任务状态的 action
    toggleItem: (id) => {
      let action = Actions.toggleItemAction(id)
      dispatch(action)
    },

    // 生成一个切换全选反选的 action
    toggleAll: (isAll) => {
      let action = Actions.toggleAllAction(isAll)
      dispatch(action)
    },

    // 展示编辑框 action
    showEditInput: (id, e) => {
      let action = Actions.showEditInputAction(id)
      dispatch(action)

      let input = e.target.parentNode.nextSibling

      setTimeout(() => {
        // 页面已经显示input元素之后才控制获取焦点
        input && input.focus()
      }, 0)
    },

    // 重新编辑任务 action
    editEtitle: (id, e) => {
      let value = e.target.value
      let action = Actions.editEtitleAction(id, value)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)