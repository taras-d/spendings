import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { ProtectedRoute } from 'components';

import Login from '../user/login';
import Signup from '../user/signup';
import Profile from '../user/profile';
import Spendings from '../spendings';

import './root.less';

class Root extends React.Component {

    render() {
        const user = this.props.user;
        return (
            <div className="root">
                <Switch>
                    <ProtectedRoute 
                        path="/" exact 
                        component={Spendings}
                        canActivate={() => user}
                        redirectTo="/login"
                    />
                    <ProtectedRoute 
                        path="/login" exact 
                        component={Login}
                        canActivate={() => !user}
                        redirectTo="/"
                    />
                    <ProtectedRoute 
                        path="/signup" exact 
                        component={Signup}
                        canActivate={() => !user}
                        redirectTo="/"
                    />
                    <ProtectedRoute 
                        path="/profile" exact 
                        component={Profile}
                        canActivate={() => user}
                        redirectTo="/login"
                    />
                </Switch>
            </div>
        );
    }

}

const mapStateToProps = state => ({ user: state.user });

export default withRouter( connect(mapStateToProps)(Root) );