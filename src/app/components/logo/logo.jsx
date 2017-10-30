import React from 'react';
import { Link } from 'react-router-dom';

import './logo.less';

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/">
                <span>S</span>
                <span>pendings</span>
            </Link>
        </div>
    );
}

export default Logo;