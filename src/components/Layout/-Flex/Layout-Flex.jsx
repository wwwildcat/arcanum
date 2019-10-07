import React from 'react';
import {cnLayout} from '../Layout';
import Current from '../../Current/Current';
import './Layout-Flex.css';

function LayoutFlex() {
	return (
		<div className={cnLayout('Flex')}>
			<Current />
		</div>
	);
}

export default LayoutFlex;