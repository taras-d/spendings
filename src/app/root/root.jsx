import React from 'react';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';

import utils from 'utils';

import Login from '../user/login';
import Signup from '../user/signup';
import Profile from '../user/profile';

import './root.less';

class Root extends React.Component {

    constructor() {
        super(...arguments);

        // Save history in utils to use it outside React components
        utils.history = history;
    }

    render() {
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
}

export default withRouter(Root);