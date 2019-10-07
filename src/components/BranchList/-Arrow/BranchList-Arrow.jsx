import React from 'react';
import './BranchList-Arrow.css';
import {cnBranchList} from '../BranchList';
import ArrowDownGray from '../../Icon/_type/Icon_type_arrowDownGray';

class BranchListArrow extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		
	}

	render () {
		return (
			<span className={cnBranchList('Arrow')}>
				<ArrowDownGray />
			</span>
		);
	}
}

export default BranchListArrow;