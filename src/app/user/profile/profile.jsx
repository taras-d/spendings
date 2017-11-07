import React from 'react';
import { connect } from 'react-redux';

import Spin from 'antd/lib/spin';
import Alert from 'antd/lib/alert';

import api from 'api';

import PageLayout from 'components/pageLayout';
import ProfileForm from './profileForm';

import { userUpdate } from 'store/user';

import './profile.less';

class Profile extends React.Component {

    state = {
        loading: false,
        saving: false,
        data: {},
        message: null
    };

    render() {
        const { loading, saving, data, message } = this.state;
        return (
            <PageLayout className="profile">
                <PageLayout.Header/>
                <header className="section-header">My profile</header>
                {message &&
                    <Alert type={message.type} message={message.text} closable/>}
                {loading?
                    <div className="text-center"><Spin size="large"/></div>:
                    <ProfileForm data={data} loading={saving} onSubmit={this.onSubmit}/>
                }
            </PageLayout>
        )
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        this.setState({ loading: true });

        api.userService.getUser().subscribe(data => {
            this.setState({ loading: false, data });
        }, err => {
            this.setState({ 
                loading: false,
                message: { type: 'error', text: err.reason }
            });
        });
    }

    updateUser(data) {
        this.setState({ saving: true, message: null });
        
        api.userService.updateUser(data).subscribe(res => {
            // Update ok - dispatch action and show message
            this.props.dispatch( userUpdate(res) );
            this.setState({
                saving: false,
                message: { type: 'success', text: 'Changes successfuly saved' }
            });
        }, err => {
            // Update fail - show message
            this.setState({
                saving: false,
                message: { type: 'error', text: err.reason }
            });
        })
    }

    onSubmit = data => {
        this.updateUser(data);
    }

}

export default connect()(Profile);