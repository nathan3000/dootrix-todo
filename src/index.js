import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import './normalize.css';
import 'font-awesome/css/font-awesome.css'
import './index.css';
import todoApp from './reducer'
import * as actions from './actions'
import auth from 'lib/auth'
import App from 'containers/App/App'
import HomePage from 'containers/HomePage/HomePage'
import LoginPage from 'containers/LoginPage/LoginPage'
import LogoutPage from 'containers/LogoutPage/LogoutPage'

const store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware
  )
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} onEnter={(nextState, replace) => requireAuth(store, replace)} />
        <Route path="/login" component={LoginPage}/>
        <Route path="/logout" component={LogoutPage}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

function requireAuth(store, replace) {
    const state = store.getState()
    if (!state.loggedIn) {
        if (auth.hasToken()) {
            store.dispatch(actions.loginSuccess())
        } else {
          replace({
            pathname: '/login'
          })
        }      
    } 
}