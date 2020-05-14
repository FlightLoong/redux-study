import React from 'react'
import Todos from './Todos.jsx'
import store from './store/Store.js'
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Todos></Todos>
      </Provider>
    </div>
  )
}

export default App
