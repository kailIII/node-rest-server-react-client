import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { Provider } from 'react-redux'
import Store from '../../../../store'
import PageTodosComponent from '../../../../modules/layouts/components/PageTodos';

const StoreInstance = Store()

it('render PageTodosComponent', () => {
    const div = document.createElement('div');
    render(
        <Provider store={StoreInstance}>
            <PageTodosComponent />
        </Provider>
    , div);
});
