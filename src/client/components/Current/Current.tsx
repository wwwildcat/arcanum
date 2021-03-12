import React from 'react';
import { connect } from 'react-redux';
import BranchList from '../BranchList/BranchList';
import State from '../../store/types';
import './Current.css';


interface Props {
	currentView: string;
	hash?: string;
	commiter?: string;
	date?: string;
}

const mapStateToProps = (state: State) => ({
	currentView: state.currentView
});

const Current = ({
	currentView,
	hash = 'c4d248',
	commiter = 'robot-srch-releaser',
	date = '20 Oct 2017, 12:24'
}: Props) =>
		<div className="Current">
			<div className="Current-Name">{currentView}</div>
			<BranchList />
			<div className="Current-LastCommit">
				Last commit
				<span className="Current-LastCommit_blue"> {hash}</span> on
				<span className="Current-LastCommit_blue"> {date}</span> by <div className="Current-LastCommit_commiter">{commiter}</div>
			</div>
		</div>

export default connect(mapStateToProps)(Current);