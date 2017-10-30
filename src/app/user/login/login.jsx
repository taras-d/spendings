import React from 'react';

import { PageLayout, Logo } from 'components';
import LoginForm from './loginForm';

import './login.less';

export default class Login extends React.Component {

    render() {
        return (
            <PageLayout className="login">
                <Logo/>
                <LoginForm/>
            </PageLayout>
        );
    }

}