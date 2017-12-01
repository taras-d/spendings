/* eslint-disable no-unused-vars */

import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';

import config from 'config';
import utils from 'utils';
import createStore from 'store';

import Root from './root';

import '../styles/main.less';

// Load current user, create store and render app
utils.loadUser().subscribe(user => {
    const store = createStore({ user });
    render(
        <LocaleProvider locale={enUS}>
            <Provider store={store}>
                <Router>
                    <Root/>
                </Router>
            </Provider> 
        </LocaleProvider>,
        document.getElementById('app')
    );
});