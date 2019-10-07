import React from 'react';
import './RepoList-Arrow.css';
import {cnRepoList} from '../RepoList';
import ArrowDownBlack from '../../Icon/_type/Icon_type_arrowDownBlack';

class RepoListArrow extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		
	}

	render () {
		return (
			<span className={cnRepoList('Arrow')}>
				<ArrowDownBlack />
			</span>
		);
	}
}

export default RepoListArrow;