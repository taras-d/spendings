import React from 'react';
import update from 'immutability-helper';
import moment from 'moment';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import utils from 'utils';

import SpendingsFilter from './spendingsFilter';
import SpendingEdit from './spendingEdit';

import './spendingsList.less';

export default class SpendingsList extends React.Component {

    state = {
        filter: {
            period: [
                moment().startOf('month'),
                moment().endOf('month')
            ]
        },
        items: [],
        editSpending: null
    };

    render() {
        const { filter, editSpending } = this.state;
        return (
            <div className="spendings-list">
                <SpendingsFilter filter={filter} onChange={this.onFilterChange}/>
                <Button type="primary" className="spendings-add" onClick={this.onAdd}>
                    <Icon type="file-add"/> Add
                </Button>
                {editSpending && 
                    <SpendingEdit spending={editSpending} 
                        onComplete={this.onEditComplete} onCancel={this.onEditCancel}/>}
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
        this.onEdit({ date: moment(), items: [] });
    }

    onEdit = spending => {
        this.setState({ editSpending: spending });
    }

    onEditCancel = () => {
        this.setState({ editSpending: null });
    }

    onEditComplete = () => {
        this.setState({ editSpending: null });
    }

}