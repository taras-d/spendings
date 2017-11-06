import React from 'react';

import Alert from 'antd/lib/alert';

import api from 'api';
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
        this.setState({ loading: true, message: null });

        api.userService.loginUser(data).subscribe(res => {
            this.props.history.push('/profile');
        }, err => {
            this.setState({
                loading: false,
                message: { type: 'error', text: err.reason }
            });
        });
    }

}