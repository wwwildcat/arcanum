import React from 'react';
import {cn} from '@bem-react/classname';
import {TableRow} from './-Row/Table-Row';
import './Table.css';
import {connect} from 'react-redux';
import State, {FilesData} from '../../store/state';

interface Props {
	content: 'files' | 'branches';
	currentFiles: FilesData[];
}

const mapStateToProps = (state: State) => ({
		currentFiles: state.currentFiles
	});

export const cnTable = cn('Table');

const Table = ({content, currentFiles}: Props) => {
	if (currentFiles) {
		return (
			<div className={cnTable()}>
				<TableRow header content={content} />
				{currentFiles.map((value, number) => 
					<TableRow key={number} content={content} rowValue={value}/>)}
			</div>
		);
	}
	else return (
		<div className={cnTable()}>
			<TableRow header content={content} />
		</div>
	);
}

export default connect(mapStateToProps)(Table);