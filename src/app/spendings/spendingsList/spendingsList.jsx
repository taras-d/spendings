import React from 'react';
import update from 'immutability-helper';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import utils from 'utils';

import SpendingsFilter from './spendingsFilter';

import './spendingsList.less';

export default class SpendingsList extends React.Component {

    state = {
        filter: {
            period: utils.getCurrMonthStartEndDates()
        },
        items: []
    };

    render() {
        const { filter } = this.state;
        return (
            <div className="spendings-list">
                <SpendingsFilter filter={filter} onChange={this.onFilterChange}/>
                <Button type="primary" className="spendings-add" onClick={this.onAdd}>
                    <Icon type="file-add"/> Add
                </Button>
            </div>
        );
    }

    onFilterChange = (prop, value) => {
        this.setState(update(this.state, {
            filter: {
                [prop]: {$set: value}
            }
        }));
    }

    onAdd = () => {
        console.log('add');
    }

}