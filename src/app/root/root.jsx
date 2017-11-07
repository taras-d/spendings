import React from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';

import { ProtectedRoute } from 'components';

import Login from '../user/login';
import Signup from '../user/signup';
import Profile from '../user/profile';

import './root.less';

export default class Root extends React.Component {

    render() {
        return (
            <div className="root">
                <Switch>
                    <ProtectedRoute path="/login" exact component={Login}
                        when="no-user" redirectPath="/profile"/>
                    <ProtectedRoute path="/signup" exact component={Signup}
                        when="no-user" redirectPath="/profile"/>
                    <ProtectedRoute path="/profile" exact component={Profile}
                        when="user" redirectPath="/login"/>
                </Switch>
            </div>
        );
    }

}