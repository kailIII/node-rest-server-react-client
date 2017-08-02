import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from '../../../store'
import App from '../../../modules/layouts/App';

const StoreInstance = Store()

it('render App ok', () => {
    const div = document.createElement('div');
    render(
        <Provider store={StoreInstance}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>
    , div);
});
