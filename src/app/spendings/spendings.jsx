import React from 'react';
import update from 'immutability-helper';

import PageLayout from 'components/pageLayout';

import utils from 'utils';

import SpendingsFilter from './spendingsFilter';
import SpendingsTable from './spendingsTable';

import './spendings.less';

export default class Spendings extends React.Component {

    state = {
        filter: {
            dates: utils.getCurrMonthStartEndDates()
        }
    };

    render() {
        const { filter } = this.state;
        return (
            <PageLayout>
                <PageLayout.Header/>
                <SpendingsFilter filter={filter} onChange={this.onFilterChange}/>
                <SpendingsTable/>
            </PageLayout>
        )
    }

    onFilterChange = (value, prop) => {
        this.setState(update(this.state, {
            filter: {
                [prop]: {$set: value}
            }
        }));
    }

}