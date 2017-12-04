import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'antd/lib/auto-complete';

export default class DelayedAutoComplete extends React.Component {

    static propTypes = {
        searchDelay: PropTypes.number
    };

    static defaultProps = {
        searchDelay: 300
    };

    delayId;

    render() {
        return (
            <AutoComplete {...this.props} onSearch={this.onSearch}/>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.delayId);
    }

    onSearch = value => {
        clearTimeout(this.delayId);
        this.delayId = setTimeout(() => this.props.onSearch(value), this.props.searchDelay);
    }

}