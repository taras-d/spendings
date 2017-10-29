import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import Login from '../user/login';
import Signup from '../user/signup';

import './root.less';

const Root = () => {
    return (
        <div className="root">
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
            </Switch>
        </div>
    );
}

export default Root;