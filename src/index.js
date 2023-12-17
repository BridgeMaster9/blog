import rootReducer from './redux/reducer'
import App from './component/app/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import './index.css'
import './reset.css'

const store = configureStore({ reducer: rootReducer })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
