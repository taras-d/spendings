import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Alert from 'antd/lib/alert';
import Icon from 'antd/lib/icon';

import { PageLayout, Logo } from 'components';
import LoginForm from './loginForm';

import api from 'api';
import utils from 'utils';
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

    unmount = utils.unmountNotifier();

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
                <div className="text-center">
                    <Link to="/signup"><Icon type="user-add"/> create an account</Link>
                </div>
            </PageLayout>
        );
    }

    componentWillUnmount() {
        this.unmount.notify();
    }

    onSubmit = data => {
        this.setState({ loading: true, message: null });

        api.userService.loginUser(data).takeUntil(this.unmount).subscribe(res => {
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