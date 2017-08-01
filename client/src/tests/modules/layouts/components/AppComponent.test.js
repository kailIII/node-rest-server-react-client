import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import AppComponent from '../../../../modules/layouts/components/App';

it('render AppComponent', () => {
    const div = document.createElement('div');
    render(
        <MemoryRouter>
            <AppComponent />
        </MemoryRouter>
    , div);
});
