import React from 'react';
import {cnBranchList} from '../BranchList';
import {BranchListItemName} from '../-ItemName/BranchList-ItemName';
import {BranchListLastCommit} from '../-LastCommit/BranchList-LastCommit';
import './BranchList-Item.css';

interface Props {
	branch: string;
	date: string;
	isFirst: Boolean;
}

export const BranchListItem = ({branch, date, isFirst}: Props) => 
		<li className={cnBranchList('Item')}>
			<BranchListItemName branchName={branch} isFirst={isFirst} />
			<BranchListLastCommit date={date} isFirst={isFirst} />
		</li>