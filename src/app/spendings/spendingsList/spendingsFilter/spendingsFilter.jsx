import React from 'react';
import update from 'immutability-helper';

import DatePicker from 'antd/lib/date-picker';

import './spendingsFilter.less';

export default class SpendingsFilter extends React.Component {

    render() {
        const { filter, onChange } = this.props;
        return (
            <div className="spendings-filter">
                Period:
                <DatePicker.RangePicker 
                    format="DD.MM.YYYY"
                    value={[filter.period.start, filter.period.end]} 
                    onChange={this.onPeriodChange}/>
            </div>
        );
    }

    onPeriodChange = value => {
        const [start, end] = value;
        this.props.onChange(update(this.props.filter, {
            period: {
                $set: { start, end }
            }
        }));
    }
    
}