import React from 'react';
import { connect } from 'react-redux';
import BranchList from '../BranchList/BranchList';
import State from '../../store/types';
import './Current.scss';

interface Props {
    currentView: string;
    hash?: string;
    commiter?: string;
    date?: string;
}

const mapStateToProps = (state: State) => ({
    currentView: state.currentView,
});

const Current = ({ currentView, hash, commiter, date }: Props) => (
    <div className="Current">
        <div className="Current-Name">{currentView}</div>
        <BranchList />
        <div className="Current-LastCommit">
            Last commit
            <span className="Current-LastCommit_style_blue"> {hash}</span> on
            <span className="Current-LastCommit_style_blue"> {date}</span> by
            <div className="Current-LastCommit_style_commiter">{commiter}</div>
        </div>
    </div>
);

Current.defaultProps = {
    hash: 'c4d248',
    commiter: 'robot-srch-releaser',
    date: '20 Oct 2017, 12:24',
};

export default connect(mapStateToProps)(Current);
