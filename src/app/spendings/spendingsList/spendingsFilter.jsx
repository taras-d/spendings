import React from 'react';

import DatePicker from 'antd/lib/date-picker';

export default class SpendingsFilter extends React.Component {

    render() {
        const { filter, onChange } = this.props;
        return (
            <div className="spendings-filter">
                Period
                <DatePicker.RangePicker 
                    format="DD.MM.YYYY"
                    value={filter.period} 
                    onChange={value => onChange('period', value)}/>
            </div>
        );
    }
}