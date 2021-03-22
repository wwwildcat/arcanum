import React from 'react';
import RepoList from '../RepoList/RepoList';
import HeaderLogo from '../svg/logo.svg';
import './Header.scss';

interface Props {
    noRepo?: boolean;
}

const Header = ({ noRepo }: Props) => (
    <header className="Header">
        <HeaderLogo className="Header-Logo" />
        <RepoList noRepo={noRepo} />
    </header>
);

Header.defaultProps = {
    noRepo: false,
};

export default Header;
