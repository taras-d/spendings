import React from 'react';
import update from 'immutability-helper';
import moment from 'moment';

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
            period: [
                moment().startOf('month'),
                moment().endOf('month')
            ]
        },
        data: [],
        editSpending: null
    };

    unmount = utils.unmountNotifier();

    render() {
        const { filter, editSpending, data, loading } = this.state;
        return (
            <div className="spendings-list">
                <SpendingsFilter filter={filter} onChange={this.onFilterChange}/>
                <Button type="primary" className="spendings-add" onClick={this.onAdd}>
                    <Icon type="file-add"/> Add
                </Button>
                {editSpending && 
                    <SpendingEdit spending={editSpending} 
                        onComplete={this.onEditComplete} onCancel={this.onEditCancel}/>}
                <SpendingsTable data={data} loading={loading}/>
            </div>
        );
    }

    componentDidMount() {
        this.getSpendings();
    }

    componentWillUnmount() {
        this.unmount.notify();
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

    getSpendings() {
        this.setState({ loading: true });

        api.spendingService.getSpendings(this.state.fileter)
            .takeUntil(this.unmount)
            .subscribe(res => {
                this.setState({ loading: false, data: res.data });
            });
    }

}