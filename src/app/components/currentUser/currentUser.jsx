import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import api from 'api';

import { userLogout } from 'store/user';

import './currentUser.less';

class CurrentUser extends React.Component {

    render() {
        const user = this.props.user;
        return (
            <div className="current-user">
                {user &&
                    <Dropdown overlay={this.getMenu()} trigger={['click']}>
                        <Button>
                            {`${user.firstName} ${user.lastName}`} <Icon type="down"/>
                        </Button>
                    </Dropdown>
                }
            </div>
        );
    }

    getMenu() {
        return (
            <Menu onClick={this.onItemClick}>
                <Menu.Item key="profile">Profile</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">Log out</Menu.Item>
            </Menu>
        );
    }

    onItemClick = ({ key }) => {
        if (key === 'logout') {
            api.userService.logoutUser().subscribe(() => {
                // Logout - dispath action and navigate to login
                const { dispatch, history } = this.props;
                dispatch( userLogout() );
                history.push('/login');
            });
        } else if (key === 'profile') {
            this.props.history.push('/profile');
        }
    }

}

const mapStateToProps = state => {
    return { user: state.user };
}

export default withRouter( connect(mapStateToProps)(CurrentUser) );