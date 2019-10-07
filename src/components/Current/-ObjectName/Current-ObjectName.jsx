import React from 'react';
import {cnCurrent} from '../Current';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextSize24 from '../../Text/_size/Text_size_24';
import './Current-ObjectName.css';
import {connect} from 'react-redux';


function mapStateToProps(state) {
	return {
		currentObject: state.currentObject
	};
}

function CurrentObjectName({currentObject}) {
	return (
		<div className={cnCurrent('ObjectName') + ' ' + TextStyleBold + ' ' + TextSize24}>{currentObject}</div>
	);
}

CurrentObjectName.defaultProps = {
	currentObject: 'arcadia'
};

export default connect(mapStateToProps)(CurrentObjectName);