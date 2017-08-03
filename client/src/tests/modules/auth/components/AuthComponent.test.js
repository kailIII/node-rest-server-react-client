import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { Provider } from 'react-redux'
import Store from '../../../../store'
import AuthComponent from '../../../../modules/auth/components/Auth';

it('render AuthComponent', () => {
    const div = document.createElement('div');
    const StoreInstance = Store()
    render(
        <Provider store={StoreInstance}>
            <AuthComponent />
        </Provider>
    , div);
});
