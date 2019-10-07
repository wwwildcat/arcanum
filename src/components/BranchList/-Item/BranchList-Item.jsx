import React from 'react';
import {cnBranchList} from '../BranchList';
import BranchListItemName from '../-ItemName/BranchList-ItemName';
import BranchListLastCommit from '../-LastCommit/BranchList-LastCommit';
import './BranchList-Item.css';

function BranchListItem({branch, date, isFirst}) {
	return (
		<li className={cnBranchList('Item')}>
			<BranchListItemName branchName={branch} isFirst={isFirst} />
			<BranchListLastCommit date={date} isFirst={isFirst} />
		</li>
	);
}


export default BranchListItem;