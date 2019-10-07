import React from 'react';
import {cnTable} from '../Table';
import ArrowRightGrey from '../../Icon/_type/Icon_type_arrowRightGray';
import './Table-Button.css';

function TableButton() {
	return (
		<div className={cnTable('Button')}>
			<ArrowRightGrey />
		</div>
	);
}

export default TableButton;