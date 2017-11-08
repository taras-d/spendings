import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Alert from 'antd/lib/alert';

import api from 'api';

import { userLogout } from 'store/user';

import './profileDelete.less';

class ProfileDelete extends React.Component {

    state = {
        visible: false,
        loading: false,
        password: '',
        passwordValid: false,
        message: null
    };

    submitted = false;

    render() {
        return (
            <div className="profile-delete">
                <Button type="danger" onClick={this.openModal}>
                    Delete my account and all related data
                </Button>
                {this.getModal()}
            </div>
        );
    }

    getModal() {
        const { visible, loading, password, passwordValid } = this.state;
        return (
            <Modal title="Delete account" className="profile-delete-modal"
                visible={visible} closable={false} maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={this.closeModal}
                        disabled={loading}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="danger" 
                        disabled={!passwordValid} loading={loading} onClick={this.deleteConfirm}>
                        Delete
                    </Button>
                ]}
            >
                {this.getMessage()}
                {this.getModalForm()}
            </Modal>
        );
    }

    getMessage() {
        const message = this.state.message;
        return message? <Alert type={message.type} message={message.text} closable/>: null;
    }

    getModalForm() {
        const { loading, password, passwordValid } = this.state;
        return (
            <Form>
                <Form.Item label="Password">
                    <Input name="password" 
                        placeholder="Enter password" 
                        type="password"
                        disabled={loading}
                        maxLength="80"
                        value={password} 
                        onChange={e => {
                            const value = e.target.value;
                            this.setState({
                                password: value, passwordValid: !!value.trim()
                            });
                        }}/>
                </Form.Item>
            </Form>
        );
    }

    openModal = () => {
        this.setState({ visible: true });
    }

    closeModal = () => {
        this.setState({ visible: false });
    }

    deleteConfirm = () => {
        this.setState({ loading: true, message: null });

        api.userService.deleteUser(this.state.password).mergeMap(() => {
            return api.userService.logoutUser();
        }).subscribe(() => {
            this.props.dispatch( userLogout() );
        }, err => {
            this.setState({
                loading: false,
                message: { type: 'error', text: err.reason }
            });
        })
    }

}

export default connect()(ProfileDelete);