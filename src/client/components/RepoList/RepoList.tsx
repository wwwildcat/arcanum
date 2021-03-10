import React from 'react';
import {cn} from '@bem-react/classname';
import {RepoListItem} from './-Item/RepoList-Item';
import RepoListClosed from './_closed/RepoList_closed';
import State from '../../store/types';
import {connect} from 'react-redux';
import './RepoList.css';

export const cnRepoList = cn('RepoList');

const mapStateToProps = (state: State) => ({
		allRepos: state.allRepos
	});

interface Props {
	allRepos: string[];
}

const RepoList = ({allRepos}: Props) => 
			<ul className={RepoListClosed}>
				{allRepos.map((item, number) => 
					<RepoListItem key={number} repoName={item} />)}
			</ul>

export default connect(mapStateToProps)(RepoList);