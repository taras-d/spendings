import React from 'react';

import { PageLayout, Logo } from 'components';

export default class Login extends React.Component {

    render() {
        return (
            <PageLayout className="login">
                <Logo/>
            </PageLayout>
        );
    }

}