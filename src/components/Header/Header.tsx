import React from 'react';
import { connect } from 'react-redux';
import RepoList from '../RepoList/RepoList';
import HeaderLogo from '../svg/logo.svg';
import State from '../../store/types';
import './Header.scss';

interface Props {
    isLoading: boolean;
    noRepo?: boolean;
}

const mapStateToProps = (state: State) => ({
    isLoading: state.isLoading,
});

const Header = ({ isLoading, noRepo }: Props) => {
    if (isLoading) {
        return <></>;
    }
    return (
        <header className="Header">
            <HeaderLogo className="Header-Logo" />
            <RepoList noRepo={noRepo} />
        </header>
    );
};

Header.defaultProps = {
    noRepo: false,
};

export default connect(mapStateToProps)(Header);
