import React from 'react';

import Collapse from 'antd/lib/collapse';

import PageLayout from 'components/pageLayout';
import ProfileDetails from './profileDetails';
import ProfileDelete from './profileDelete';

import './profile.less';

export default class Profile extends React.Component {

    render() {
        return (
            <PageLayout className="profile">
                <PageLayout.Header/>
                <header className="section-header">My profile</header>
                <Collapse defaultActiveKey={['details']}>
                    <Collapse.Panel header="Details" key="details">
                        <ProfileDetails/>
                    </Collapse.Panel>
                    <Collapse.Panel header="Delete account" key="delete">
                        <ProfileDelete/>
                    </Collapse.Panel>
                </Collapse>
            </PageLayout>
        )
    }
}