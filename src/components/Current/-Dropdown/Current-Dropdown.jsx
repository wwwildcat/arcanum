import React from 'react';
import {cnCurrent} from '../Current';
import CurrentBranchName from '../-BranchName/Current-BranchName';
import BranchListArrow from '../../BranchList/-Arrow/BranchList-Arrow';
import BranchList from '../../BranchList/BranchList';
import './Current-Dropdown.css';

function CurrentDropdown() {
	return (
		<div className={cnCurrent('Dropdown')}>
			<CurrentBranchName />
			<BranchListArrow />
			<BranchList />
		</div>
	);
}

export default CurrentDropdown;