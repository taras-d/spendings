import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {

    render() {
        const { props } = this,
            { redirectPath, when, user } = props;

        if (
            (when === 'user' && user) ||
            (when === 'no-user' && !user)
        ) {
            return <props.component {...props}/>;
        } else {
            return <Redirect to={redirectPath} from={props.location.pathname}/>;
        }
    }

}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(ProtectedRoute);