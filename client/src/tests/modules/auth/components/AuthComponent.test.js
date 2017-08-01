import React from 'react';
import { ReactDOM, render } from 'react-dom';
import AuthComponent from '../../../../modules/auth/components/Auth';

it('render PageAutAuthComponenthComponent', () => {
    const div = document.createElement('div');
    render(
        <AuthComponent />
    , div);
});
