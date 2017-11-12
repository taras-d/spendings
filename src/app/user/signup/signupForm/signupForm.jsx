import React from 'react';
import update from 'immutability-helper';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import utils from 'utils';

export default class SingupForm extends React.Component {

    state = {
        data: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        errors: null,
        loading: this.props.loading
    };

    submitted = false;

    render() {

        const itemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            colon: false
        };

        const { data, loading } = this.state,
            errors = this.state.errors || {};

        return (
            <Form className="signup-form" onSubmit={this.onSubmit} layout="horizontal">
                <Form.Item label="First name" {...itemLayout}
                    validateStatus={errors.firstName? 'error': ''} help={errors.firstName}>
                    <Input name="firstName"
                        value={data.firstName}
                        onChange={this.onFieldChange}
                        disabled={loading}
                        maxLength="80"
                        placeholder="Enter first name"/>
                </Form.Item>
                <Form.Item label="Last name" {...itemLayout}
                    validateStatus={errors.lastName? 'error': ''} help={errors.lastName}>
                    <Input name="lastName"
                        value={data.lastName}
                        onChange={this.onFieldChange}
                        disabled={loading}
                        maxLength="80"
                        placeholder="Enter last name"/>
                </Form.Item>
                <Form.Item label="Email" {...itemLayout}
                    validateStatus={errors.email? 'error': ''} help={errors.email}>
                    <Input name="email"
                        value={data.email}
                        onChange={this.onFieldChange}
                        disabled={loading}
                        maxLength="80"
                        placeholder="Enter email"/>
                </Form.Item>
                <Form.Item label="Password" {...itemLayout}
                    validateStatus={errors.password? 'error': ''} help={errors.password}>
                    <Input name="password"
                        type="password"
                        value={data.password}
                        onChange={this.onFieldChange}
                        disabled={loading}
                        maxLength="80"
                        placeholder="Enter password"/>
                </Form.Item>
                <Form.Item className="text-center">
                    <Button type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon="user-add">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        )
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

    validate(data) {
        if (!this.submitted) {
            return;
        }

        return utils.validate(data, {
            firstName: {
                required: true,
                length: { minimum: 2 }
            },
            lastName: {
                required: true,
                length: { minimum: 2 }
            },
            email: {
                required: true,
                email: true
            },
            password: {
                password: true
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

        this.setState({ errors }, () => {
            if (!errors) {
                this.props.onSubmit(this.state.data);
            }
        });
    }

}