import React from 'react';
import {Link} from 'react-router-dom';
import {cnTable} from '../Table';
import TextColorBlue3 from '../../Text/_color/Text_color_blue3';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TableCellContentName from './_content/Table-Cell_content_name';
import TableCellContentHash from './_content/Table-Cell_content_hash';
import TableCellContentMessage from './_content/Table-Cell_content_message';
import TableCellContentAuthor from './_content/Table-Cell_content_author';
import TableCellContentDate from './_content/Table-Cell_content_date';
import {TableIcon} from '../-Icon/Table-Icon';
import Commiter from '../../Commiter/Commiter';
import {connect} from 'react-redux';
import {goToObject, setPath} from '../../../store/actions';
import {getDirectoryContent, getFileContent} from '../../../store/middleware';
import State from '../../../store/state';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

interface Props {
	content?: 'name' | 'hash' | 'message' | 'commiter' | 'date';
	value: string;
	type?: 'blob' | 'tree' | 'branch',
	currentRepository: string;
	pathToObject: string;
	onObjectNameClick: (type: 'blob' | 'tree' | 'branch', value: string, repo: string, pathForData: string) => void;
}

const mapStateToProps = (state: State) => ({
		currentRepository: state.currentRepository,
		pathToObject: state.pathToObject
	});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
		onObjectNameClick: (type: 'blob' | 'tree' | 'branch', value: string, repo: string, pathForData: string) => {
			dispatch(goToObject(value));
			dispatch(setPath(pathForData));
			if (type === 'tree') {
				dispatch(getDirectoryContent(repo, pathForData));
			}
			if (type === 'blob') {
				dispatch(getFileContent(repo, pathForData));
			}
		}
	});

const TableCell = ({content, value, type, onObjectNameClick, currentRepository, pathToObject}: Props) => {
	if (content === 'name' && type) {
		const pathForData = pathToObject ? pathToObject + '/' + value : value;
		const pathToNext = '/' + currentRepository + '/' + type + '/master/' + pathForData;
		return (
			<div className={TableCellContentName} onClick={() => onObjectNameClick(type, value, currentRepository, pathForData)}>
				<Link to={pathToNext}>
					<TableIcon type={type} />
					<span className={TextStyleBold}>{value}</span>
				</Link>
			</div>
		);
	}
	else if (content === 'hash') {
		return (
			<div className={TableCellContentHash}>
				<span className={TextColorBlue3}>{value}</span>
			</div>
		);
	}
	else if (content === 'message') {
		return (
			<div className={TableCellContentMessage}>{value}</div>
		);
	}
	else if (content === 'commiter') {
		return (
			<div className={TableCellContentAuthor + ' ' + Commiter()}>{value}</div>
		);
	}
	else if (content === 'date') {
		return (
			<div className={TableCellContentDate}>{value}</div>
		);
	}
	else return (
		<div className={cnTable('Cell')}>{value}</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);