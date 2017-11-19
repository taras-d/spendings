import React from 'react';
import update from 'immutability-helper';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import utils from 'utils';
import api from 'api';

import SpendingEdit from './spendingEdit';
import SpendingsFilter from './spendingsFilter';
import SpendingsTable from './spendingsTable';

import './spendingsList.less';

export default class SpendingsList extends React.Component {

    state = {
        filter: {
            period: utils.getMonthStartEnd()
        },
        spendings: {
            data: [],
            total: 0,
            limit: 10,
            offset: 0
        },
        loading: false,
        editSpending: null
    };

    unmount = utils.unmountNotifier();

    render() {
        const { filter, editSpending, spendings, loading } = this.state;
        return (
            <div className="spendings-list">
                {/* Filter */}
                <SpendingsFilter 
                    filter={filter} 
                    onChange={this.onFilterChange}/>
                {/* Add button */}
                <Button 
                    type="primary" 
                    className="spendings-add" 
                    onClick={this.onAdd}>
                    <Icon type="file-add"/> Add
                </Button>
                {/* Edit modal */}
                {editSpending && 
                    <SpendingEdit 
                        spending={editSpending} 
                        onComplete={this.onEditComplete} 
                        onCancel={this.onEditCancel}/> }
                {/* Table */}
                <SpendingsTable 
                    spendings={spendings}
                    loading={loading}
                    onEdit={this.onEdit}
                    onDelete={this.onDelete}
                    onPageChange={this.onPageChange}/>
            </div>
        );
    }

    componentDidMount() {
        this.getSpendings();
    }

    componentWillUnmount() {
        this.unmount.notify();
    }

    onFilterChange = filter => {
        this.setState({ filter }, () => this.getSpendings());
    }

    onAdd = () => {
        this.openEdit({ date: new Date(), items: [] });
    }

    onEdit = spending => {
        this.openEdit(spending);
    }

    onEditCancel = () => {
        this.openEdit(null);
    }

    onEditComplete = () => {
        this.openEdit(null);
        this.getSpendings();
    }

    onDelete = spending => {
        this.setState({ loading: true });
        api.spendingService.deleteSpending(spending.id)
            .takeUntil(this.unmount)
            .subscribe(() => this.getSpendings());
    }

    onPageChange = page => {
        const state = this.state;
        this.setState(update(state, {
            spendings: {
                offset: {$set: (page - 1) * state.spendings.limit}
            }
        }), () => this.getSpendings());
    }

    openEdit(spending) {
        this.setState({ editSpending: spending });
    }

    getSpendings() {
        this.setState({ loading: true });

        const { filter, spendings } = this.state;
        return api.spendingService.getSpendings({
            period: filter.period,
            offset: spendings.offset,
            limit: spendings.limit
        }).takeUntil(this.unmount)
        .subscribe(spendings => this.setState({ loading: false, spendings }));
    }

}