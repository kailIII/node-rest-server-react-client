import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { Provider } from 'react-redux'
import Store from '../../../../store'
import PageAuthComponent from '../../../../modules/layouts/components/PageAuth';

it('render PageAuthComponent', () => {
    const div = document.createElement('div');
    const StoreInstance = Store()
    render(
        <Provider store={StoreInstance}>
            <PageAuthComponent />
        </Provider>
    , div);
});
