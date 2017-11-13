import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class ProtectedRoute extends React.Component {

    render() {
        const { props } = this;
        return props.canActivate()?
            <props.component {...props}/>:
            <Redirect to={props.redirectTo} from={props.location.pathname}/>;
    }

}