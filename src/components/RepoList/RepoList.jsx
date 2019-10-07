import React from 'react';
import {cn} from '@bem-react/classname';
import RepoListItem from './-Item/RepoList-Item';
import RepoListClosed from './_closed/RepoList_closed';
import {connect} from 'react-redux';
import './RepoList.css';

export const cnRepoList = cn('RepoList');

function mapStateToProps(state) {
	return {
		allRepositories: state.allRepositories
	};
}

function RepoList ({allRepositories}) {
	return (
		<ul className={RepoListClosed}>
			{allRepositories.map((item, number) => 
				<RepoListItem key={number} repoName={item} />)}
		</ul>
	);
}

RepoList.defaultProps = {
	allRepositories: ['Arc', 'My repository', 'Devtools-team repository']
};

export default connect(mapStateToProps)(RepoList);