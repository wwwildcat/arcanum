import React from 'react';
import {cnCurrent} from '../Current';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextSize24 from '../../Text/_size/Text_size_24';
import State from '../../../store/state';
import './Current-ObjectName.css';
import {connect} from 'react-redux';

interface Props {
	currentObject: string;
}

const mapStateToProps = (state: State) => ({
		currentObject: state.currentObject
	});

const CurrentObjectName = ({currentObject}: Props) => 
		<div className={cnCurrent('ObjectName') + ' ' + TextStyleBold + ' ' + TextSize24}>{currentObject}</div>

export default connect(mapStateToProps)(CurrentObjectName);