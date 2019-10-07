import React from 'react';
import {cn} from '@bem-react/classname';
import HeaderDropdown from './-Dropdown/Header-Dropdown';
import HeaderLogo from './-Logo/Header-Logo';
import './Header.css';

export const cnHeader = cn('Header');

function Header () {
	return (
		<header className={cnHeader()}>
			<HeaderLogo />
			<HeaderDropdown />
		</header>
	);
}

export default Header;