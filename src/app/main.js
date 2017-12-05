/* eslint-disable no-unused-vars */

import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import LocaleProvider from 'antd/lib/locale-provider';

import config from 'config';
import utils from 'utils';
import createStore from 'store';

import Root from './root';

import '../styles/main.less';

// Try to Load current user before starting app
utils.loadUser().subscribe(user => {
    const store = createStore({ user });
    render(
        <LocaleProvider>
            <Provider store={store}>
                <Router>
                    <Root/>
                </Router>
            </Provider> 
        </LocaleProvider>,
        document.getElementById('app')
    );
});