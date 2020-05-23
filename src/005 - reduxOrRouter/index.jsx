import React from 'react'
import Todos from './Todos.jsx'
import store from './store/Store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/all" />
            <Route path="/:filter?" component={Todos} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App
