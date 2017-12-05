import React from 'react';
import moment from 'moment';
import update from 'immutability-helper';

import Modal from 'antd/lib/modal';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';

import api from 'api';
import utils from 'utils';
import { AutoComplete } from 'components';

import './spendingEdit.less';

export default class SpendingEdit extends React.Component {

    state = {
        loading: false,
        message: null,
        spending: this.props.spending
    };

    formItemLayout = { 
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    };

    unmount = utils.unmountNotifier();
    itemNameSearch = null;

    render() {

        const { onCancel } = this.props,
            { loading, message } = this.state;

        return (
            <Modal className="spending-edit" 
                okText="Submit"
                confirmLoading={loading}
                title={this.getTitle()}
                visible={true}
                onOk={this.onSubmit}
                onCancel={onCancel}>
                {message && 
                    <Alert type={message.type} message={message.text}/>}
                <Form>
                    {this.getDate()}
                    {this.getItems()}
                </Form>
            </Modal>
        );
    }

    componentWillUnmount() {
        this.unmount.notify();
    }
    
    getTitle() {
        return `${this.state.spending.id? 'Edit': 'Add'} spending`;
    }

    getDate() {
        const spending = this.state.spending;
        return (
            <Form.Item label="Date" {...this.formItemLayout}>
                <DatePicker 
                    value={moment(spending.date)} 
                    onChange={this.onDateChange}
                    format="DD.MM.YYYY" 
                    allowClear={false}/>
            </Form.Item>
        );
    }

    getItems() {
        const { spending } = this.state;

        const listItems = spending.items.map((item, index) => {
            return (
                <li key={index}>
                    <Input.Group compact size="default">
                        <AutoComplete placeholder="Name"
                            value={item.name}
                            dataSource={item.dataSource}
                            onChange={value => this.onItemChange(index, 'name', value)}
                            onSearch={value => this.onItemNameSearch(index, value)}/>
                        <InputNumber min={0} 
                            placeholder="Cost" 
                            value={item.cost}
                            onChange={value => this.onItemChange(index, 'cost', value)}
                            onBlur={event => this.onItemChange(index, 'cost', Number(event.target.value) || 0)}/>
                    </Input.Group>
                    <Button type="dashed" 
                        shape="circle" 
                        size="small" 
                        icon="close" 
                        className="spending-item-delete"
                        onClick={() => this.onItemRemove(index)}
                    />
                </li>
            );
        });

        return (
            <Form.Item label="Items" {...this.formItemLayout}
                className="spending-items">
                <ul className="spending-items-list">{listItems}</ul>
                <div className="text-center">
                    <Button type="dashed" size="small" onClick={this.onItemAdd}>add item</Button>
                </div>
            </Form.Item>
        );
    }

    onDateChange = value => {
        this.setState(update(this.state, {
            spending: {
                date: {$set: value}
            }
        }));
    }

    onItemAdd = () => {
        this.setState(update(this.state, {
            spending: {
                items: {
                    $push: [{ name: '', cost: 0 }]
                }
            }
        }));
    }

    onItemRemove = index => {
        this.setState(update(this.state, {
            spending: {
                items: {
                    $splice: [[index, 1]]
                }
            }
        }));
    }

    onItemChange = (index, prop, value) => {
        const state = this.state;

        const newItem = {
            ...state.spending.items[index],
            [prop]: value
        };

        this.setState(update(state, {
            spending: {
                items: {
                    $splice: [[index, 1, newItem]]
                }
            }
        }));
    }

    onItemNameSearch = (index, value) => {
        if (this.itemNameSearch) {
            this.itemNameSearch.unsubscribe();
        }
        
        this.itemNameSearch = api.spendingService.autocompleteSpendingItem(value)
            .takeUntil(this.unmount)
            .subscribe(data => this.onItemChange(index, 'dataSource', data));
    }

    onSubmit = () => {

        if (!this.valid()) {
            this.setState({
                message: { type: 'info', text: 'Item name cannot be empty' }
            });
            return;
        }

        this.setState({ loading: true });

        this.getRequest().takeUntil(this.unmount).subscribe(
            () => this.props.onComplete(),
            err => {
                this.setState({ 
                    loading: false,
                    message: { type: 'error', text: err.reason }
                });
            }
        );
    }

    valid() {
        const { spending } = this.state;
        return !spending.items.some(item => !item.name || !item.name.trim());
    }

    getRequest() {
        const { spending } = this.state;
        return spending.id? 
            api.spendingService.updateSpending(spending.id, spending):
            api.spendingService.createSpending(spending);
    }
    
}