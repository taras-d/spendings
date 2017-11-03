import React from 'react';
import { Link } from 'react-router-dom';

import Alert from 'antd/lib/alert';

import { PageLayout, Logo } from 'components';
import SignupForm from './signupForm';

import './signup.less';

export default class Singup extends React.Component {

    state = {
        loading: false,
        data: {},
        message: null
    };

    render() {
        const { loading, data, message } = this.state;
        return (
            <PageLayout className="signup">
                <Logo/>
                <header className="section-header">Create account</header>
                {message && <Alert type={message.type} message={message.text}/>}
                <SignupForm data={data} onSubmit={this.onSubmit} loading={loading}/>
            </PageLayout>
        );
    }

    onSubmit = data => {
        console.log(data);
        this.setState({ loading: true, message: null });
        setTimeout(() => {
            this.setState({
                loading: false,
                message: { 
                    type: 'success', 
                    text: <div>
                            Account successfuly created. <Link to="/login">Click here</Link> to login.
                        </div>
                },
                data: {}
            });
        }, 1500);
    }

}