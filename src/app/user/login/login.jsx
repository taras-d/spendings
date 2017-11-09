import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Alert from 'antd/lib/alert';

import { PageLayout, Logo } from 'components';
import LoginForm from './loginForm';

import api from 'api';
import { userLogin } from 'store/user';

import './login.less';

class Login extends React.Component {

    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        message: null
    };

    constructor() {
        super(...arguments);

        const query = queryString.parse(this.props.location.search);
        if (query.email) {
            this.state.data.email = query.email;
        }
    }

    render() {
        const { message, loading, data } = this.state;
        return (
            <PageLayout className="login">
                <Logo/>
                {message && <Alert type={message.type} message={message.text}/>}
                <LoginForm data={data} onSubmit={this.onSubmit} loading={loading}/>
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