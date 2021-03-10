import React from 'react';
import {cnCurrent} from '../Current';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextSize24 from '../../Text/_size/Text_size_24';
import State from '../../../store/types';
import './Current-ObjectName.css';
import {connect} from 'react-redux';

interface Props {
	currentView: string;
}

const mapStateToProps = (state: State) => ({
	currentView: state.currentView
});

const CurrentObjectName = ({currentView}: Props) => 
		<div className={cnCurrent('ObjectName') + ' ' + TextStyleBold + ' ' + TextSize24}>{currentView}</div>

export default connect(mapStateToProps)(CurrentObjectName);