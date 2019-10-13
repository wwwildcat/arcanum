import React from 'react';
import {cnTable} from '../Table';
import {File} from '../../Icon/_type/Icon_type_file';
import {Folder} from '../../Icon/_type/Icon_type_folder';
import {Branch} from '../../Icon/_type/Icon_type_branch';
import './Table-Icon.css';

interface Props {
	type: 'tree' | 'blob' | 'branch'
}

export const TableIcon = ({type}: Props) => {
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
	else return (
			<span className={cnTable('Icon')}>
				<Branch />
			</span>
		);

}