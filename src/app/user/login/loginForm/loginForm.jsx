import React from 'react';
import update from 'immutability-helper';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import utils from 'utils';

import './loginForm.less';

export default class LoginForm extends React.Component {

    state = {
        data: {
            email: '',
            password: ''
        },
        errors: null,
        loading: false
    };

    submitted = false;

    render() {
        const { data, loading } = this.state;
        let errors = this.state.errors || {};
            
        return (
            <Form className="login-form" onSubmit={this.onSubmit}>
                <Form.Item validateStatus={errors.email? 'error': ''} help={errors.email}>
                    <Input name="email"
                        placeholder="Enter email" 
                        addonBefore={<Icon type="mail" title="Email"/>} 
                        disabled={loading}
                        maxLength="80"
                        value={data.email} 
                        onChange={this.onFieldChange}/>
                </Form.Item>
                <Form.Item validateStatus={errors.password? 'error': ''} help={errors.password}>
                    <Input name="password" 
                        placeholder="Enter password" 
                        type="password" 
                        addonBefore={<Icon type="lock" title="Password"/>} 
                        disabled={loading}
                        maxLength="80"
                        value={data.password} 
                        onChange={this.onFieldChange}/>
                </Form.Item>
                <Form.Item>
                    <Button className="login-form-submit"
                        type="primary" 
                        htmlType="submit"
                        loading={loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    validate = data => {

        if (!this.submitted) {
            return null;
        }

        return utils.validate(data, {
            email: { 
                required: true,
                email: true 
            },
            password: { 
                required: true,
                length: { minimum: 6 }
            }
        });
    }

    onFieldChange = event => {
        const target = event.target;

        const data = update(this.state.data, {
            [target.name]: {$set: target.value}
        });

        const errors = this.validate(data);

        this.setState({ data, errors });
    }

    onSubmit = event => {
        event.preventDefault();

        this.submitted = true;

        const errors = this.validate(this.state.data);

        this.setState({ errors, loading: !errors }, () => {
            if (!errors) {
                console.log(this.state.data);
            }
        });
    }

}