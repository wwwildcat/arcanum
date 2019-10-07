import React from 'react';
import {cnBranchList} from '../BranchList';
import TextColorGray1 from '../../Text/_color/Text_color_gray1';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import './BranchList-ItemName.css';

function BranchListItemName({branchName, isFirst}) {
	if (isFirst) {
		return (
			<div className={cnBranchList('ItemName') + ' ' + TextStyleBold}>{branchName}</div>
		)
	}
	else return (
		<div className={cnBranchList('ItemName') + ' ' + TextColorGray1 + ' ' + TextStyleBold}>{branchName}</div>
	);
}

export default BranchListItemName;