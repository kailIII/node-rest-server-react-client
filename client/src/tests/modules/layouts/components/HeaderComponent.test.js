import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import HeaderComponent from '../../../../modules/layouts/components/Header';

it('render HeaderComponent', () => {
    const div = document.createElement('div');
    render(
        <MemoryRouter>
            <HeaderComponent />
        </MemoryRouter>
    , div);
});
