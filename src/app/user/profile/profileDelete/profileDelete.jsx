import React from 'react';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

export default class ProfileDelete extends React.Component {

    render() {
        return (
            <div className="profile-delete">
                <Button type="primary">
                    Delete my profile <Icon type="delete"/>
                </Button>
            </div>
        );
    }

}