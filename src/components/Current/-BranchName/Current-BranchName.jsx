import React from 'react';
import {cnCurrent} from '../Current';
import TextColorGray2 from '../../Text/_color/Text_color_gray2';
import TextSize24 from '../../Text/_size/Text_size_24';

function CurrentBranchName({branchName}) {
	return (
		<span className={cnCurrent('BranchName') + ' ' + TextColorGray2 + ' ' + TextSize24}>{branchName}</span>
	);
}

CurrentBranchName.defaultProps = {
	branchName: 'master'
};

export default CurrentBranchName;