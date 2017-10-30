import React from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';

import './loginForm.less';

export default class LoginForm extends React.Component {

    state = {
        email: '',
        password: '',
        remember: true
    }

    render() {
        const { email, password, remember } = this.state;
        return (
            <Card className="login-form" title="Log in">
                <Form className="base-form" onSubmit={this.onSubmit}>
                    <Form.Item>
                        <Input name="email" 
                            placeholder="Enter email" 
                            prefix={<Icon type="mail"/>} 
                            value={email} 
                            onChange={this.onFieldChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Input name="password" 
                            placeholder="Enter password" 
                            type="password" 
                            prefix={<Icon type="lock"/>} 
                            value={password} 
                            onChange={this.onFieldChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox name="remember"
                            value={remember}
                            onChange={this.onFieldChange}>
                            Remember me
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button className="login-form-submit"
                            type="primary" 
                            htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

    onFieldChange = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.type === 'checkbox'? target.checked: target.value
        });
    }

    onSubmit = event => {
        event.preventDefault();
        console.log(this.state);
    }

}