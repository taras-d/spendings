import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import Login from '../user/login';
import Signup from '../user/signup';
import Profile from '../user/profile';

import './root.less';

const Root = () => {
    return (
        <div className="root">
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/profile" exact component={Profile}/>
            </Switch>
        </div>
    );
}

export default Root;