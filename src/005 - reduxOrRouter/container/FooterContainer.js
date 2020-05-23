import { connect } from 'react-redux'
import * as Actions from '../store/ActionCreate.js'
import Footer from '../Footer.jsx'

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