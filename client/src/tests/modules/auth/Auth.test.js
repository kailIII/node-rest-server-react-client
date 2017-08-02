import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { Provider } from 'react-redux'
import Store from '../../../store'
import Auth from '../../../modules/auth/Auth';

it('render Auth ok', () => {
    const div = document.createElement('div');
    const StoreInstance = Store()
    render(
        <Provider store={StoreInstance}>
            <Auth />
        </Provider>
    , div);
});
