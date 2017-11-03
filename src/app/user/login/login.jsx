import React from 'react';

import Alert from 'antd/lib/alert';

import { PageLayout, Logo } from 'components';
import LoginForm from './loginForm';

import './login.less';

export default class Login extends React.Component {

    state = {
        loading: false,
        message: null
    };

    render() {
        const { message, loading } = this.state;
        return (
            <PageLayout className="login">
                <Logo/>
                {message && <Alert type={message.type} message={message.text}/>}
                <LoginForm onSubmit={this.onSubmit} loading={loading}/>
            </PageLayout>
        );
    }

    onSubmit = data => {
        console.log(data);
        this.setState({ loading: true, message: null });
        setTimeout(() => {
            this.setState({
                loading: false,
                message: { type: 'error', text: 'Email or password incorrect' }
            });
        }, 1500);
    }

}