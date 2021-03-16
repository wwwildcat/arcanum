import React from 'react';
import { connect } from 'react-redux';
import BranchList from '../BranchList/BranchList';
import State, { ContentData } from '../../store/types';
import './Current.scss';

interface Props {
    data: ContentData[];
    name: string;
    type: 'dir' | 'file';
}

const mapStateToProps = (state: State) => ({
    name: state.currentView,
    data: state.currentTableContent,
});

const getLastCommit = (type: 'dir' | 'file', data: ContentData[], fileName: string) => {
    if (type === 'file') {
        return data.find((item) => item.name === fileName);
    }

    data.sort((a, b) => {
        return Number(new Date(b.date)) - Number(new Date(a.date));
    });

    return data[0];
};

const Current = ({ data, name, type }: Props) => {
    const { hash, commiter, date } = getLastCommit(type, data, name) || {};

    return (
        <div className="Current">
            <div className="Current-Name">{name}</div>
            <BranchList />
            <div className="Current-LastCommit">
                Last commit
                <span className="Current-LastCommit_style_blue"> {hash}</span> on
                <span className="Current-LastCommit_style_blue"> {date}</span> by
                <div className="Current-LastCommit_style_commiter">{commiter}</div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Current);
