import React from 'react';
import { connect } from 'react-redux';

import Alert from 'antd/lib/alert';

import { PageLayout, Logo } from 'components';
import LoginForm from './loginForm';

import api from 'api';
import { userLogin } from 'store/user';

import './login.less';

class Login extends React.Component {

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
            // Login ok - dispatch action
            const { dispatch, history } = this.props;
            api.loggerService.logUser(res.user);
            dispatch( userLogin(res.user) );
        }, err => {
            // Login fail - show error message
            this.setState({
                loading: false,
                message: { type: 'error', text: err.reason }
            });
        });
    }

}

export default connect()(Login);