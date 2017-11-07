import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {

    render() {
        const props = this.props;
        return props.user? <props.component {...props}/>:
            <Redirect to="/login" from={props.location.pathname}/>;
    }

}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(ProtectedRoute);