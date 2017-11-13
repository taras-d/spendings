import React from 'react';

import DatePicker from 'antd/lib/date-picker';

import './spendingsFilter.less';

export default class SpendingsFilter extends React.Component {

    render() {
        const { filter, onChange } = this.props;
        return (
            <div className="spendings-filter">
                <DatePicker.RangePicker 
                    value={filter.dates}
                    onChange={value => {
                        onChange(value, 'dates');
                    }}/>
            </div>
        );
    }

}