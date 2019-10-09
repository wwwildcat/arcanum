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
import TableIcon from '../-Icon/Table-Icon';
import Commiter from '../../Commiter/Commiter';
import {connect} from 'react-redux';
import {goToObject, setPath} from '../../../server/redux/actions';
import {getDirectoryContent, getFileContent} from '../../../server/redux/middleware';

function mapStateToProps(state) {
	return {
		currentRepository: state.currentRepository,
		pathToObject: state.pathToObject
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onObjectNameClick: (type, value, repo, pathForData) => {
			dispatch(goToObject(value));
			dispatch(setPath(pathForData));
			if (type === 'tree') {
				dispatch(getDirectoryContent(repo, pathForData));
			}
			if (type === 'blob') {
				dispatch(getFileContent(repo, pathForData));
			}
		}
	};
}

function TableCell({content, value, type, onObjectNameClick, currentRepository, pathToObject}) {
	if (content === 'name') {
		const pathForData = pathToObject.length ? pathToObject.join('/') + '/' + value : value;
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
	else if (content === 'author') {
		return (
			<div className={TableCellContentAuthor + ' ' + Commiter()}>{value}</div>
		);
	}
	else if (content === 'date') {
		return (
			<div className={TableCellContentDate}>{value}</div>
		);
	}
	return (
		<div className={cnTable('Cell')}>{value}</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);