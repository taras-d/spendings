import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import api from 'api';

import './currentUser.less';

class CurrentUser extends React.Component {

    render() {
        return (
            <div className="current-user">
                <Dropdown overlay={this.getMenu()} trigger={['click']}>
                    <Button>
                        Taras Datsenko <Icon type="down"/>
                    </Button>
                </Dropdown>
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
                this.props.history.push('/login');
            });
        } else if (key === 'profile') {
            this.props.history.push('/profile');
        }
    }

}

export default withRouter(CurrentUser);