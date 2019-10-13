import React from 'react';
import {cn} from '@bem-react/classname';
import TableRow from './-Row/Table-Row';
import './Table.css';
import {connect} from 'react-redux';

function mapStateToProps(state) {
	return {
		currentFiles: state.currentFiles
	};
}

export const cnTable = cn('Table');

function Table({content, currentFiles}) {
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

Table.defaultProps = {
	content: 'files',
};

export default connect(mapStateToProps)(Table);