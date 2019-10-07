import React from 'react';
import {cn} from '@bem-react/classname';
import FooterAddress from './-Address/Footer-Address';
import FooterCopyright from './-Copyright/Footer-Copyright';
import './Footer.css';

export const cnFooter = cn('Footer');

export function Footer() {
	return (
		<footer className={cnFooter()}>
			<FooterAddress />
			<FooterCopyright />
		</footer>
	);
}

export default Footer;