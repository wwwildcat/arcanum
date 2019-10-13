import React from 'react';
import './RepoList-Item.css';
import {cnRepoList} from '../RepoList';
import cnText from '../../Text/Text';

interface Props {
	repoName: string;
}

export const RepoListItem = ({repoName}: Props) => 
		<li className={cnRepoList('Item') + ' ' + cnText()}>{repoName}</li>