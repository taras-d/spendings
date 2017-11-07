import React from 'react';
import { connect } from 'react-redux';

import Alert from 'antd/lib/alert';

import api from 'api';

import PageLayout from 'components/pageLayout';
import ProfileForm from './profileForm';

import { userUpdate } from 'store/user';

import './profile.less';

class Profile extends React.Component {

    state = {
        saving: false,
        message: null
    };

    render() {
        const { saving, message } = this.state,
            { user } = this.props;
        return (
            <PageLayout className="profile">
                <PageLayout.Header/>
                <header className="section-header">My profile</header>
                {message &&
                    <Alert type={message.type} message={message.text} closable/>}
                {user &&
                    <ProfileForm data={user} loading={saving} onSubmit={this.onSubmit}/>
                }
            </PageLayout>
        )
    }

    updateUser(data) {
        this.setState({ saving: true, message: null });
        
        api.userService.updateUser(data).subscribe(user => {
            // Update ok - dispatch action and show success message
            this.props.dispatch( userUpdate(user) );
            this.setState({
                saving: false,
                message: { type: 'success', text: 'Changes successfuly saved' }
            });
        }, err => {
            // Update fail - show error message
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

const mapStateToProps = state => {
    return { user: state.user };
}

export default connect(mapStateToProps)(Profile);