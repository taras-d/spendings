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
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import config from './config';
import Root from './root';
import store from './store';

import '../styles/main.less';

render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <Router>
                <Root/>
            </Router>
        </Provider> 
    </LocaleProvider>,
    document.getElementById('app-root')
);