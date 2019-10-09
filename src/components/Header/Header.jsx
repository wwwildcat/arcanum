import React from 'react';
import {cn} from '@bem-react/classname';
import HeaderDropdown from './-Dropdown/Header-Dropdown';
import HeaderLogo from './-Logo/Header-Logo';
import './Header.css';
import {connect} from 'react-redux';

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading,
	};
}

export const cnHeader = cn('Header');

function Header({isLoading}) {
	if (isLoading) {
		return (<div></div>);
	}
	return (
		<header className={cnHeader()}>
			<HeaderLogo />
			<HeaderDropdown />
		</header>
	);
}

export default connect(mapStateToProps)(Header);