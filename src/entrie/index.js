import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../store/configureStore'
import Home from '../pages/containers/home'

const container = document.getElementById('react-container')

ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
  container
)
