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
            limit: 10,
            skip: 0,
            total: 0
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
        this.setState(update(this.state, { 
            filter: {$set: filter},
            spendings: {
                skip: {$set: 0}
            }
        }), () => this.getSpendings());
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
            .subscribe(() => {
                const state = this.state;
                if (state.spendings.data.length === 1 && state.spendings.skip > 0) {
                    // Move to the previous page if user deletes last item from current page
                    this.setState(update(this.state, {
                        spendings: {
                            skip: {$set: state.spendings.skip - state.spendings.limit}
                        }
                    }), () => this.getSpendings())
                } else {
                    this.getSpendings();
                }
            });
    }

    onPageChange = page => {
        const state = this.state;
        this.setState(update(state, {
            spendings: {
                skip: {
                    $set: utils.paging.getSkip(page, state.spendings.limit)
                }
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
            skip: spendings.skip,
            limit: spendings.limit
        }).takeUntil(this.unmount)
        .subscribe(spendings => this.setState({ loading: false, spendings }));
    }

}