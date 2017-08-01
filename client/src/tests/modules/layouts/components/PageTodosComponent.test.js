import React from 'react';
import { ReactDOM, render } from 'react-dom';
import PageTodosComponent from '../../../../modules/layouts/components/PageTodos';

it('render PageTodosComponent', () => {
    const div = document.createElement('div');
    render(
        <PageTodosComponent />
    , div);
});
