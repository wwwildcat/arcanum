import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as File } from '../../svg/File.svg';
import { ReactComponent as Folder } from '../../svg/Folder.svg';
import { ReactComponent as Branch } from '../../svg/Branch.svg';
import { TableType } from '../../../store/types';

interface Props {
	value: string;
	type: TableType,
	repo: string;
	path: string;
	handleClick: (type: TableType, value: string, repo: string, nextPath: string) => void;
}

const TableLink = ({ value, type, handleClick, repo, path }: Props) => {
	const nextPath = path ? `${path}/${value}` : value;

	return (
		<Link
			onClick={() => handleClick(type, value, repo, nextPath)}
			to={`/${repo}/${type}/master/${nextPath}`}
		>
			{type === 'tree' && <Folder className="Table-Icon" />}
			{type === 'blob' && <File className="Table-Icon" />}
			{type === 'branch' && <Branch className="Table-Icon" />}
			{value}
		</Link>
	);
}

export default TableLink;