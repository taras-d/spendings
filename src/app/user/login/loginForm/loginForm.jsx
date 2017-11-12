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
        data: this.props.data,
        errors: null,
        loading: this.props.loading
    };

    submitted = false;

    render() {
        const { data, loading } = this.state,
            errors = this.state.errors || {};
            
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
                <Form.Item className="text-center">
                    <Button type="primary" 
                        htmlType="submit"
                        loading={loading}
                        icon="login">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    componentWillReceiveProps(nextProps) {
        const props = this.props;

        if (props.loading !== nextProps.loading) {
            this.setState({ loading: nextProps.loading });
        }

        if (props.data !== nextProps.data) {
            this.setState({ data: nextProps.data });
        }
    }

    validate = data => {

        if (!this.submitted) {
            return null;
        }

        return utils.validate(data, {
            email: { required: true, email: true },
            password: { required: true }
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

        this.setState({ errors }, () => {
            if (!errors) {
                this.props.onSubmit(this.state.data);
            }
        });
    }

}