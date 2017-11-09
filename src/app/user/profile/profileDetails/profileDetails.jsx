import React from 'react';
import { connect } from 'react-redux';

import Alert from 'antd/lib/alert';

import api from 'api';
import { userUpdate } from 'store/user';

import ProfileDetailsForm from './profileDetailsForm';

import './profileDetails.less';

class ProfileDetails extends React.Component {

    state = {
        saving: false,
        message: null
    };

    render() {
        const { message, saving } = this.state,
            user = this.props.user;
        return (
            <div className="profile-details">
                {message &&
                    <Alert type={message.type} message={message.text} closable/>}
                <ProfileDetailsForm data={user} loading={saving} onSubmit={this.onSubmit}/>
            </div>
        );
    }

    onSubmit = data => {
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
        });
    }

}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(ProfileDetails);