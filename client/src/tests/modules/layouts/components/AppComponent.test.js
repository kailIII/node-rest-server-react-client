import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import AppComponent from '../../../../modules/layouts/components/App';
import Store from '../../../../store'

const StoreInstance = Store()

it('render AppComponent', () => {
    const div = document.createElement('div');
    render(
        <Provider store={StoreInstance}>
            <MemoryRouter>
                <AppComponent />
            </MemoryRouter>
        </Provider>
    , div);
});
