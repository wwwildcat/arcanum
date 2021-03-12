import React from 'react';
import { ReactComponent as ArrowDown } from '../svg/ArrowDown.svg';
import State from '../../store/types';
import { connect } from 'react-redux';
import './RepoList.css';

const mapStateToProps = (state: State) => ({
	allRepos: state.allRepos,
	currentRepo: state.currentRepo
});

interface Props {
	allRepos: string[];
	currentRepo: string;
}

const RepoList = ({ allRepos, currentRepo }: Props) =>
	<div className="RepoList">
		<span className="RepoList-CurrentRepo">
			Repository <span className="RepoList-Title">{currentRepo}</span>
		</span>
		<ArrowDown className="RepoList-Arrow"/>
		<ul className="RepoList-Dropdown RepoList-Dropdown_closed">
			{allRepos.map((item, number) =>
				<li className="RepoList-Item" key={number}>{item}</li>)}
		</ul>
	</div>

export default connect(mapStateToProps)(RepoList);