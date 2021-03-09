import React from 'react';
import {cn} from '@bem-react/classname';
import {RepoListItem} from './-Item/RepoList-Item';
import RepoListClosed from './_closed/RepoList_closed';
import State from '../../store/state';
import {connect} from 'react-redux';
import './RepoList.css';

export const cnRepoList = cn('RepoList');

const mapStateToProps = (state: State) => ({
		allRepositories: state.allRepositories
	});

interface Props {
	allRepositories: string[];
}

const RepoList = ({allRepositories}: Props) => 
			<ul className={RepoListClosed}>
				{allRepositories.map((item, number) => 
					<RepoListItem key={number} repoName={item} />)}
			</ul>

export default connect(mapStateToProps)(RepoList);