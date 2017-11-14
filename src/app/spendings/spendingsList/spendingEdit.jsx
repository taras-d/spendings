import React from 'react';
import moment from 'moment';
import update from 'immutability-helper';

import Modal from 'antd/lib/modal';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';

export default class SpendingEdit extends React.Component {

    state = {
        loading: false,
        item: this.props.item
    };

    formItemLayout = { 
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    };

    render() {

        const { onCancel } = this.props,
            { loading } = this.state;

        return (
            <Modal className="spending-edit" 
                okText="Submit"
                confirmLoading={loading}
                title={this.getTitle()}
                visible={true}
                onOk={this.onSubmit}
                onCancel={onCancel}>
                <Form>
                    {this.getDate()}
                    {this.getItems()}
                </Form>
            </Modal>
        );
    }
    
    getTitle() {
        const item = this.props.item;
        return `${item.id? 'Edit': 'Add'} spending`;
    }

    getDate() {
        const item = this.state.item;
        return (
            <Form.Item label="Date" {...this.formItemLayout}>
                <DatePicker value={item.date} onChange={this.onDateChange}
                    format="DD.MM.YYYY" allowClear={false}/>
            </Form.Item>
        );
    }

    getItems() {
        const spending = this.state.item;

        const inputGroups = spending.items.map((item, index) => {
            return (
                <Input.Group compact size="default" key={index}>
                    <Input placeholder="Title" 
                        value={item.title}
                        onChange={event => this.onItemChange(index, 'title', event.target.value)}/>
                    <InputNumber min={0} 
                        placeholder="Cost" 
                        value={item.cost}
                        onChange={value => this.onItemChange(index, 'cost', value)}/>
                    <a onClick={() => this.onItemRemove(index)}>x</a>
                </Input.Group>
            )
        });

        return (
            <Form.Item label="Items" {...this.formItemLayout}
                className="spending-edit-items">
                {inputGroups}
                <a onClick={this.onItemAdd}>Add item</a>
            </Form.Item>
        );
    }

    onDateChange = value => {
        this.setState(update(this.state, {
            item: {
                date: {$set: value}
            }
        }));
    }

    onItemAdd = () => {
        this.setState(update(this.state, {
            item: {
                items: {
                    $push: [{ title: '', cost: 0 }]
                }
            }
        }));
    }

    onItemRemove = index => {
        this.setState(update(this.state, {
            item: {
                items: {
                    $splice: [[index, 1]]
                }
            }
        }));
    }

    onItemChange = (index, prop, value) => {
        const state = this.state;

        const newItem = {
            ...state.item.items[index],
            [prop]: value
        };

        this.setState(update(state, {
            item: {
                items: {
                    $splice: [[index, 1, newItem]]
                }
            }
        }));
    }

    onSubmit = () => {
        this.setState({ loading: true });
        setTimeout(() => this.props.onComplete(), 1000);
    }
    
}