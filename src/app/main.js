import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// Antd
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.css';

import '../styles/main.less';

import Root from './root';

import store from './store';

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