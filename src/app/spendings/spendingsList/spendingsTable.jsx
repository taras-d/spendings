import React from 'react';

import Table from 'antd/lib/table';
import Popconfirm from 'antd/lib/popconfirm';

export default class SpendingsTable extends React.Component {

    tableColumns = [
        { title: 'Date', dataIndex: 'displayDate', width: '50%' },
        { title: 'Sum', dataIndex: 'sum', width: '30%' }
    ];

    subTableColumns = [
        { title: 'Title', dataIndex: 'title', width: '70%' },
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
        const { data, loading } = this.props;
        return (
            <Table className="spendings-table" 
                size="middle"
                rowKey="id"
                locale={{ emptyText: 'No spendings' }}
                loading={loading}
                columns={this.tableColumns} 
                dataSource={data}
                expandedRowRender={this.getItemsSubTable}
            />
        );
    }

    getItemsSubTable = record => {
        return (
            <Table className="spending-items-table" 
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

}