import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	repo: string;
	path: string;
	number: number;
	value: string;
	handleClick: (value: string, repo: string, path: string) => void;
}

const BreadCrumbsLink = ({ repo, path, number, value, handleClick }: Props) => {
	const newPath = path ? path.split('/').slice(0, number).join('/') : '';
	const newUrl = newPath.length
		? `/${repo}/tree/master/${newPath}`
		: `/${repo}`;

	return (
		<Link
			className="BreadCrumbs-Link"
			onClick={() => handleClick(value, repo, newPath)}
			to={newUrl}
		>
			{value + ' / '}
		</Link>
	);
}

export default BreadCrumbsLink;