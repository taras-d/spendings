import React from 'react';

import Spin from 'antd/lib/spin';
import Alert from 'antd/lib/alert';

import api from 'api';

import PageLayout from 'components/pageLayout';

import ProfileForm from './profileForm';

import './profile.less';

export default class Profile extends React.Component {

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

    saveUser(data) {
        this.setState({ saving: true, message: null });
        
        api.userService.updateUser(data).subscribe(() => {
            this.setState({
                saving: false,
                message: { type: 'success', text: 'Changes successfuly saved' }
            });
        }, err => {
            this.setState({
                saving: false,
                message: { type: 'error', text: err.reason }
            });
        })
    }

    onSubmit = data => {
        this.saveUser(data);
    }

}