import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux'
import TableLink from './-Link/Table-Link';
import { ReactComponent as Arrow } from '../svg/ArrowDown.svg'
import { setView, setPath } from '../../store/actions';
import { fetchDirContent, fetchFileContent } from '../../store/thunks';
import State, { FilesData, contentTypes, Content, TableType } from '../../store/types';
import { tableHeaderData } from '../data';
import './Table.css';

interface Props {
	content: 'files' | 'branches';
	currentRepo: string;
	currentPath: string;
	currentFiles: FilesData[];
	handleLinkClick: (type: TableType, value: string, repo: string, nexPath: string) => void;
}

const mapStateToProps = (state: State) => ({
	currentRepo: state.currentRepo,
	currentPath: state.currentPath,
	currentFiles: state.currentFiles
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
	handleLinkClick: (type: TableType, value: string, repo: string, nexPath: string) => {
		dispatch(setView(value));
		dispatch(setPath(nexPath));

		if (type === 'tree') {
			dispatch(fetchDirContent(repo, nexPath));
		}
		if (type === 'blob') {
			dispatch(fetchFileContent(repo, nexPath));
		}
	}
});

const Table = ({ content, currentRepo, currentPath, currentFiles, handleLinkClick }: Props) => {
	const columns = content === 'files' ? contentTypes : contentTypes.slice(0, 2);

	return (
		<div className="Table">
			<div className={`Table-Row Table-Row_header Table-Row_${content}`}>
				{tableHeaderData[content].map((item, number) =>
					<div className="Table-Cell" key={number}>{item}</div>)}
			</div>
			{currentFiles && currentFiles.map((row, number) =>
				<div className={`Table-Row Table-Row_${content}`} key={number}>
					{row && (columns as Content[]).map((item, number) =>
						<div className={`Table-Cell Table-Cell_content_${item}`} key={number}>
							{item === 'name'
								? <TableLink
									handleClick={handleLinkClick}
									path={currentPath}
									repo={currentRepo}
									type={row.type}
									value={row[item]}
								/>
								: row[item]}
						</div>
						)}
					<Arrow className="Table-Button" />
				</div>)}
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);