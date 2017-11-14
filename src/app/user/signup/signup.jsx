import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Alert from 'antd/lib/alert';
import Icon from 'antd/lib/icon';

import api from 'api';
import utils from 'utils';
import { PageLayout, Logo } from 'components';
import SignupForm from './signupForm';

import './signup.less';

export default class Singup extends React.Component {

    state = {
        loading: false,
        data: {},
        message: null
    };

    unmount = utils.unmountNotifier();

    render() {
        const { loading, data, message } = this.state;
        return (
            <PageLayout className="signup">
                <Logo/>
                <header className="signup-header">Create account</header>
                {message && <Alert type={message.type} message={message.text}/>}
                <SignupForm data={data} onSubmit={this.onSubmit} loading={loading}/>
                <div className="text-center">
                    Already have account? <Link to="/login">Log in</Link>
                </div>
            </PageLayout>
        );
    }

    componentWillUnmount() {
        this.unmount.notify();
    }

    onSubmit = data => {
        this.setState({ loading: true, message: null });

        api.userService.createUser(data).takeUntil(this.unmount).subscribe(res => {
            // Signup ok
            this.setState({
                loading: false,
                message: { type: 'success', text: this.getSuccessMessage(data) },
                data: {}
            });
        }, err => {
            // Signup fail
            this.setState({
                loading: false,
                message: { type: 'error', text: err.reason }
            });
        });
    }

    getSuccessMessage(data) {
        const to = { 
            pathname: '/login', 
            search: queryString.stringify({ email: data.email })
        };
        return (
            <div>
                Account successfuly created.<br/>
                <Link to={to}>Click here</Link> to login.
            </div>
        );
    }

}