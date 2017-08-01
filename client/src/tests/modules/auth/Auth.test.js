import React from 'react';
import { ReactDOM, render } from 'react-dom';
import Auth from '../../../modules/auth/Auth';

it('render Auth', () => {
    const div = document.createElement('div');
    render(
        <Auth />
    , div);
});
