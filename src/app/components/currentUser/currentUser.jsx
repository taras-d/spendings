import React from 'react';
import { Link } from 'react-router-dom';

import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import './currentUser.less';

export default class CurrentUser extends React.Component {

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
        console.log(key);
    }

}