import React from 'react';
import './RepoList-Item.css';
import {cnRepoList} from '../RepoList';
import cnText from '../../Text/Text';

function RepoListItem({repoName}) {
	return (
		<li className={cnRepoList('Item') + ' ' + cnText()}>{repoName}</li>
	);
}

export default RepoListItem;