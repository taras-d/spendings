import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProtectedRoute extends React.Component {

    static propTypes = {
        path: PropTypes.string,
        exact: PropTypes.bool,
        component: PropTypes.func,
        canActivate: PropTypes.func,
        redirectTo: PropTypes.string
    };

    render() {
        const { props } = this;
        return props.canActivate()?
            <props.component {...props}/>:
            <Redirect to={props.redirectTo} from={props.location.pathname}/>;
    }

}