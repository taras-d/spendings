import React from 'react';

import Alert from 'antd/lib/alert';

import { PageLayout, Logo } from 'components';
import LoginForm from './loginForm';

import './login.less';

export default class Login extends React.Component {

    state = {
        loading: false,
        result: null
    };

    render() {
        const { result, loading } = this.state;
        return (
            <PageLayout className="login">
                <Logo/>
                {result && <Alert type={result.type} message={result.message}/>}
                <LoginForm onSubmit={this.onSubmit} loading={loading}/>
            </PageLayout>
        );
    }

    onSubmit = data => {
        console.log(data);
        this.setState({ loading: true, result: null });
        setTimeout(() => {
            this.setState({
                loading: false,
                result: { type: 'error', message: 'Email or password incorrect' }
            });
        }, 500);
    }

}