import React from 'react';

import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';

import PageLayout from 'components/pageLayout';

import SpendingsList from './spendingsList';

import './spendings.less';

export default class Spendings extends React.Component {

    render() {
        return (
            <PageLayout>
                <PageLayout.Header/>
                <Tabs>
                    <Tabs.TabPane key="list" tab={<span><Icon type="database"/> List</span>}>
                        <SpendingsList/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key="stats" tab={<span><Icon type="area-chart"/> Stats</span>}>
                        Stats
                    </Tabs.TabPane>
                </Tabs>
            </PageLayout>
        )
    }

}