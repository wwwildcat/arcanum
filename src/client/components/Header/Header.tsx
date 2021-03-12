import React from 'react';
import RepoList from '../RepoList/RepoList';
import { ReactComponent as HeaderLogo } from '../svg/logo.svg';
import State from '../../store/types';
import { connect } from 'react-redux';
import './Header.css';

interface Props {
	isLoading: Boolean;
}

const mapStateToProps = (state: State) => ({
	isLoading: state.isLoading,
});

const Header = ({ isLoading }: Props) => {
	if (isLoading) {
		return (<div></div>);
	}
	return (
		<header className="Header">
			<HeaderLogo className="Header-Logo" />
			<RepoList />
		</header>
	);
}

export default connect(mapStateToProps)(Header);