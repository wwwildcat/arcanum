import React from 'react';
import RepoList from '../RepoList/RepoList';
import HeaderLogo from '../svg/logo.svg';
import './Header.scss';

const Header = () => (
    <header className="Header">
        <HeaderLogo className="Header-Logo" />
        <RepoList />
    </header>
);

export default Header;
