import React from 'react';
import {cn} from '@bem-react/classname';
import {HeaderDropdown} from './-Dropdown/Header-Dropdown';
import {HeaderLogo} from './-Logo/Header-Logo';
import State from '../../store/types';
import './Header.css';
import {connect} from 'react-redux';

interface Props {
	isLoading: Boolean;
}

const mapStateToProps = (state: State) => ({
		isLoading: state.isLoading,
	});

export const cnHeader = cn('Header');

const Header = ({isLoading}: Props) => {
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