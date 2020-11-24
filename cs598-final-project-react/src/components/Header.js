import React from 'react';
import Link from './Link';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link className="item" href="/">
                Main Page
            </Link>

            <Link className="item" href="/profile">
                Profile
            </Link>

            <Link className="item" href="/question">
                Question Sample Page
            </Link>
        </div>
    );
};

export default Header;