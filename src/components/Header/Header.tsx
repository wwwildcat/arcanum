import React from 'react';
import RepoList from '../RepoList/RepoList';
import HeaderLogo from '../svg/logo.svg';
import './Header.scss';

interface Props {
    noCurrentRepo: boolean;
}

const Header = ({ noCurrentRepo }: Props) => (
    <header className="Header">
        <HeaderLogo className="Header-Logo" />
        <RepoList noCurrentRepo={noCurrentRepo} />
    </header>
);

export default Header;
