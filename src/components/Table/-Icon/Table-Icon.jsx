import React from 'react';
import {cnTable} from '../Table';
import File from '../../Icon/_type/Icon_type_file';
import Folder from '../../Icon/_type/Icon_type_folder';
import Branch from '../../Icon/_type/Icon_type_branch';
import './Table-Icon.css';

function TableIcon({type}) {
	if (type === 'tree') {
		return (
			<span className={cnTable('Icon')}>
				<Folder />
			</span>
		);
	}
	else if (type === 'blob') {
		return (
			<span className={cnTable('Icon')}>
				<File />
			</span>
		);
	}
	else if (type === 'branch') {
		return (
			<span className={cnTable('Icon')}>
				<Branch />
			</span>
		);
	}
}

export default TableIcon;