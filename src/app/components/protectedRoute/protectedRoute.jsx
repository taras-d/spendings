import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import api from 'api';

export default class ProtectedRoute extends React.Component {

    render() {
        const props = this.props;
        if (api.tokenService.getToken()) {
            return <props.component {...props}/>
        } else {
            return <Redirect to="/login" from={props.location.pathname}/>
        }
    }

}