import React from 'react';
import {cnFooter} from '../Footer';
import './Footer-Version.css';

function FooterVersion() {
	return (
		<span className={cnFooter('Version')}>UI: 0.1.15</span>
	);
}

export default FooterVersion;