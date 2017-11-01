import React from 'react';

import PageLayout from 'components/pageLayout';

import './profile.less';

export default class Profile extends React.Component {

    render() {
        return (
            <PageLayout className="profile">
                <PageLayout.Header/>
                <div>Profile</div>
            </PageLayout>
        )
    }

}