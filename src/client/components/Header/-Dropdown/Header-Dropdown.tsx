import React from 'react';
import {cnHeader} from '../Header';
import RepoListCurrentRepo from '../../RepoList/-CurrentRepo/Repolist-CurrentRepo';
import RepoListArrow from '../../RepoList/-Arrow/RepoList-Arrow';
import RepoList from '../../RepoList/RepoList';
import './Header-Dropdown.css';

export const HeaderDropdown = () => 
		<div className={cnHeader('Dropdown')}>
			<RepoListCurrentRepo />
			<RepoListArrow />
			<RepoList />
		</div>