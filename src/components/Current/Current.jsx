import React from 'react';
import {cn} from '@bem-react/classname';
import CurrentObjectName from './-ObjectName/Current-ObjectName';
import CurrentDropdown from './-Dropdown/Current-Dropdown';
import CurrentLastCommit from './-LastCommit/Current-LastCommit';
import './Current.css';

export const cnCurrent = cn('Current');

function Current() {
	return (
		<div className={cnCurrent()}>
			<CurrentObjectName />
			<CurrentDropdown />
			<CurrentLastCommit />
		</div>
	);
}

export default Current;