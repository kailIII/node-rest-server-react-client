import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import App from '../App';

it('render App', () => {
    const div = document.createElement('div');
    render(
        <MemoryRouter>
            <App/>
        </MemoryRouter>
    , div);
});
