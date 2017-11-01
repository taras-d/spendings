import React from 'react';

import Logo from 'components/logo';
import CurrentUser from 'components/currentUser';

import './pageLayoutHeader.less';

export default class PageLayoutHeader extends React.Component {

    render() {
        return (
            <div className="page-layout-header">
                <Logo/>
                <CurrentUser/>
            </div>
        );
    }

}