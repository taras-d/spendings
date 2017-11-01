import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PageLayoutHeader from './pageLayoutHeader';

import './pageLayout.less';

export default class PageLayout extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    }

    static defaultProps = {
        className: '',
        children: null
    }

    render() {
        const { children, className } = this.props;
        return (
            <div className={classNames('page-layout', className)}>
                {children}
            </div>
        );
    }

}

PageLayout.Header = PageLayoutHeader;