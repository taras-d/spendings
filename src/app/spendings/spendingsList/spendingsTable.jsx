import React from 'react';

import Table from 'antd/lib/table';

export default class SpendingsTable extends React.Component {

    tableColumns = [
        { title: 'Date', dataIndex: 'displayDate', width: '60%' },
        { title: 'Sum', dataIndex: 'sum', width: '60%' }
    ];

    subTableColumns = [
        { title: 'Title', dataIndex: 'title', width: '70%' },
        { title: 'Cost', dataIndex: 'cost', width: '30%' }
    ];

    render() {
        const { data, loading } = this.props;
        return (
            <Table className="spendings-table" 
                size="middle"
                rowKey="id"
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
                pagination={false}
                showHeader={false}
                columns={this.subTableColumns}
                dataSource={record.items}/>
        );
    }

}