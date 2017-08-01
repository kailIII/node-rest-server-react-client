import React from 'react';
import { ReactDOM, render } from 'react-dom';
import PageAuthComponent from '../../../../modules/layouts/components/PageAuth';

it('render PageAuthComponent', () => {
    const div = document.createElement('div');
    render(
        <PageAuthComponent />
    , div);
});
