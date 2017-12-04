import React from 'react';

import Table from 'antd/lib/table';
import Popconfirm from 'antd/lib/popconfirm';

import utils from 'utils';

import './spendingsTable.less';

export default class SpendingsTable extends React.Component {

    tableColumns = [
        { title: 'Date', dataIndex: 'displayDate', width: '50%' },
        { title: 'Sum', dataIndex: 'sum', width: '30%' }
    ];

    subTableColumns = [
        { title: 'Name', dataIndex: 'name', width: '70%' },
        { title: 'Cost', dataIndex: 'cost', width: '30%' }
    ];

    constructor() {
        super(...arguments);

        this.tableColumns.push({ 
            title: '', key: 'action', 
            render: this.getRowActions, width: '20%' 
        });
    }

    render() {
        const { spendings, loading } = this.props;
        return (
            <Table className="spendings-table" 
                bordered={true}
                size="middle"
                rowKey="id"
                locale={{ emptyText: 'No spendings' }}
                loading={loading}
                columns={this.tableColumns} 
                dataSource={spendings.data}
                expandedRowRender={this.getItemsSubTable}
                pagination={this.getPagination()}
            />
        );
    }

    getItemsSubTable = record => {
        return (
            <Table className="spending-items-table" 
                bordered={true}
                size="small"
                rowKey="id"
                locale={{ emptyText: 'No items' }}
                pagination={false}
                showHeader={false}
                columns={this.subTableColumns}
                dataSource={record.items}/>
        );
    }

    getRowActions = (text, record, index) => {
        const { onEdit, onDelete } = this.props;
        return (
            <div className="text-right">
                <a onClick={() => onEdit(record)}>Edit</a>
                <span className="ant-divider"/>
                <Popconfirm 
                    title="Are you sure?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDelete(record)}>
                    <a>Delete</a>
                </Popconfirm>
            </div>
        );
    }

    getPagination() {
        const { spendings, onPageChange } = this.props,
            { total, limit, skip } = spendings;

        return {
            total,
            pageSize: limit,
            current: utils.paging.getPage(skip, limit),
            onChange: onPageChange,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        };
    }

}