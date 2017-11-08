import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

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