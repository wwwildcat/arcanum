import React from 'react';
import {cnBranchList} from '../BranchList';
import TextColorGray2 from '../../Text/_color/Text_color_gray2';
import TextSize13 from '../../Text/_size/Text_size_13';
import TextLineHeight20 from '../../Text/_lineHeight/Text_lineHeight_20';
import './BranchList-LastCommit.css';

interface Props {
	date: string;
	isFirst: Boolean;
}

export const BranchListLastCommit = ({date, isFirst}: Props) => {
		if (isFirst) {
			return (
				<div className={cnBranchList('LastCommit') + ' ' + TextSize13 + ' ' + TextLineHeight20}>LastCommit: {date}</div>
			);
		}
		return (
			<div className={cnBranchList('LastCommit') + ' ' + TextColorGray2 + ' ' + TextSize13 + ' ' + TextLineHeight20}>LastCommit: {date}</div>
		);
}