import React from 'react';
import {cn} from '@bem-react/classname';
import './BranchList.css';
import BranchListItem from './-Item/BranchList-Item';
import BranchListClosed from './_closed/BranchList_closed';

export const cnBranchList = cn('BranchList');

function BranchList({list}) {
	return (
		<ul className={BranchListClosed}>
			{list.map((item, number) =>
				<BranchListItem key={number} branch={item.branch} date={item.date} isFirst={!number} />)}
		</ul>
	);
}

BranchList.defaultProps = {
	list: [
		{
			branch: 'trunk',
			date: '4 s ago'
		},
		{
			branch: 'users/rudskoy/DEVTOOLS-43865',
			date: '1 min ago'
		},
		{
			branch: 'users/rudskoy/DEVTOOLS-37948',
			date: '16:25'
		},
		{
			branch: 'users/rudskoy/DEVTOOLS-94877',
			date: 'yesterday, 14:50'
		},
		{
			branch: 'users/rudskoy/DEVTOOLS-87450',
			date: 'Jan 11, 12:01'
		},
		{
			branch: 'users/rudskoy/DEVTOOLS-27073',
			date: 'Dec 29, 2017'
		}
	]
};

export default BranchList;