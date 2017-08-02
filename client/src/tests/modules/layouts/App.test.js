import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import Store from '../../../store'
import App from '../../../modules/layouts/App';

const StoreInstance = Store()
const myHistory = syncHistoryWithStore(createBrowserHistory(), StoreInstance)

it('render App ok', () => {
    const div = document.createElement('div');
    render(
        <Provider store={StoreInstance}>
            <MemoryRouter history={myHistory}>
                <App/>
            </MemoryRouter>
        </Provider>
    , div);
});
