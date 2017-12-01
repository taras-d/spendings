import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';

import api from 'api';
import utils from 'utils';

import { userLogout } from 'store/user';

import './currentUser.less';

class CurrentUser extends React.Component {

    static propTypes = {
        user: PropTypes.object
    };
    
    unmount = utils.unmountNotifier();

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

    componentWillUnmount() {
        this.unmount.notify();
    }

    getMenu() {
        return (
            <Menu onClick={this.onItemClick}>
                <Menu.Item key="profile">Profile</Menu.Item>
                <Menu.Item key="spendings">Spendings</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">Log out</Menu.Item>
            </Menu>
        );
    }

    onItemClick = ({ key }) => {
        const props = this.props;
        switch (key) {

            case 'profile':
                props.history.push('/profile');
                break;

            case 'spendings':
                props.history.push('/');
                break;

            case 'logout':
                api.userService.logoutUser().takeUntil(this.unmount).subscribe(() => {
                    // Logout - dispath action and navigate to login
                    const { dispatch, history } = props;
                    dispatch( userLogout() );
                    history.push('/login');
                });
                break;
        }
    }

}

const mapStateToProps = state => ({ user: state.user });

export default withRouter( connect(mapStateToProps)(CurrentUser) );