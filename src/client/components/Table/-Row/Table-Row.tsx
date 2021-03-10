import React from 'react';
import cnText from '../../Text/Text';
import {TableButton} from '../-Button/Table-Button';
import TableCell from '../-Cell/Table-Cell';
import TableRowContentFiles from './_content/Table-Row_content_files';
import TableRowContentBranches from './_content/Table-Row_content_branches';
import TableRowHeader from './_header/Table-Row_header';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextColorGray5 from '../../Text/_color/Text_color_gray5';
import {FilesData} from '../../../store/types';
import './Table-Row.css';

interface Props {
	rowValue?: FilesData;
	content: 'files' | 'branches';
	header?: Boolean;
}

export const TableRow = ({rowValue, content, header}: Props) => {
	let rowClassName = '';
	if (header) {
		if (content === 'files') {
			rowClassName += TableRowHeader + ' ' + TextStyleBold + ' ' + TextColorGray5 + ' ' + TableRowContentFiles;
			return (
				<div className={rowClassName}>
					<TableCell value='Name'/>
					<TableCell value='Last commit'/>
					<TableCell value='Commit message'/>
					<TableCell value='Commiter'/>
					<TableCell content='date' value='Updated'/>
					<TableButton />
				</div>
			);
		}
		else {
			rowClassName += TableRowHeader + ' ' + TextStyleBold + ' ' + TextColorGray5 + ' ' + TableRowContentBranches;
			return (
				<div className={rowClassName}>
					<TableCell value='Name'/>
					<TableCell value='Commit hash'/>
					<TableButton />
				</div>
			);
		}
	} 
	else if (content === 'files' && rowValue) {
		rowClassName += TableRowContentFiles + ' ' + cnText();
		return (
			<div className={rowClassName}>
				<TableCell content='name' value={rowValue.name} type={rowValue.type}/>
				<TableCell content='hash' value={rowValue.hash}/>
				<TableCell content='message' value={rowValue.message}/>
				<TableCell content='commiter' value={rowValue.commiter}/>
				<TableCell content='date' value={rowValue.date}/>
				<TableButton />
			</div>
		);
	}
	else if (content === 'branches' && rowValue) {
		rowClassName += TableRowContentBranches + ' ' + cnText();
		return (
			<div className={rowClassName}>
				<TableCell content='name' value={rowValue.name} type={rowValue.type}/>
				<TableCell content='hash' value={rowValue.hash}/>
				<TableButton />
			</div>
		);
	}
	else return null;
}