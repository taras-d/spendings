import React from 'react';

import PageLayout from 'components/pageLayout';

import SpendingsFilter from './spendingsFilter';
import SpendingsTable from './spendingsTable';

import './spendings.less';

export default class Spendings extends React.Component {

    render() {
        return (
            <PageLayout>
                <PageLayout.Header/>
                <SpendingsFilter/>
                <SpendingsTable/>
            </PageLayout>
        )
    }

}