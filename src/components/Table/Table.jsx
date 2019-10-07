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
	return (
		<div className={cnTable()}>
			<TableRow header content={content} />
			{currentFiles.map((value, number) => 
				<TableRow key={number} content={content} rowValue={value}/>)}
		</div>
	);
}

Table.defaultProps = {
	content: 'files',
	values: [
		{
			type: 'tree',
			name: 'api',
			hash: 'd53dsv',
			message: '[vcs] move http to arc',
			author: 'noxoomo',
			date: '4 s ago'			
		},
		{
			type: 'tree',
			name: 'api',
			hash: 'd53dsv',
			message: '[vcs] move http to arc',
			author: 'noxoomo',
			date: '4 s ago'			
		},
		{
			type: 'blob',
			name: 'api',
			hash: 'd53dsv',
			message: '[vcs] move http to arc',
			author: 'noxoomo',
			date: '4 s ago'			
		},
		{
			type: 'blob',
			name: 'ya.make',
			hash: 'd53dsv',
			message: '[vcs] move http to arc',
			author: 'noxoomo',
			date: '4 s ago'		
		}
	]
};

export default connect(mapStateToProps)(Table);