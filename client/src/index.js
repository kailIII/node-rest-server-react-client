import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './modules/layouts/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import Store from './store'

const StoreInstance = Store()
const myHistory = syncHistoryWithStore(createBrowserHistory(), StoreInstance)

// Render application
ReactDOM.render(
    <Provider store={StoreInstance}>
        <Router history={myHistory}>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root')
);

// Service worker
registerServiceWorker()
