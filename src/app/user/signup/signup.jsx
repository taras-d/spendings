import React from 'react';

import Alert from 'antd/lib/alert';

import { PageLayout, Logo } from 'components';
import SignupForm from './signupForm';

import './signup.less';

export default class Singup extends React.Component {

    state = {
        loading: false,
        result: null
    };

    render() {
        const { loading, result } = this.state;
        return (
            <PageLayout className="signup">
                <Logo/>
                <header className="signup-header">Create free account</header>
                {result && <Alert type={result.type} message={result.message}/>}
                <SignupForm onSubmit={this.onSubmit} loading={loading}/>
            </PageLayout>
        );
    }

    onSubmit = data => {
        console.log(data);
        this.setState({ loading: true, result: null });
        setTimeout(() => {
            this.setState({
                loading: false,
                result: { type: 'success', message: 'Account successfuly created. Now you can login.' }
            });
        }, 500);
    }

}