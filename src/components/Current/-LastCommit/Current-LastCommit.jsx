import React from 'react';
import {cnCurrent} from '../Current';
import cnText from '../../Text/Text';
import TextColorBlue3 from '../../Text/_color/Text_color_blue3';
import cnCommiter from '../../Commiter/Commiter';

function CurrentLastCommit({hash, author, date}) {
	return (
		<div className={cnCurrent('LastCommit') + ' ' + cnText()}>
			Last commit <span className={TextColorBlue3}>{hash}</span> on <span className={TextColorBlue3}>{date}</span> by <span className={cnCommiter()}>{author}</span>
		</div>
	);
}

CurrentLastCommit.defaultProps = {
	hash: 'c4d248',
	author: 'robot-srch-releaser',
	date: '20 Oct 2017, 12:24'
};

export default CurrentLastCommit;