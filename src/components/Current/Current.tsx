import React from 'react';
import { connect } from 'react-redux';
import BranchList from '../BranchList/BranchList';
import State, { ContentData } from '../../store/types';
import './Current.scss';

interface Props {
    data: ContentData[];
    noBranch?: boolean;
    noBranchList?: boolean;
    name: string;
    type: 'tree' | 'blob';
}

const mapStateToProps = (state: State) => ({
    data: state.currentTableContent,
    name: state.currentView,
});

const getLastCommit = (type: 'tree' | 'blob', data: ContentData[], fileName: string) => {
    if (type === 'blob') {
        return data.find((item) => item.name === fileName);
    }

    data.sort((a, b) => {
        return Number(new Date(b.date)) - Number(new Date(a.date));
    });

    return data[0];
};

const Current = ({ noBranch, noBranchList, data, name, type }: Props) => {
    const { hash, commiter, date } = getLastCommit(type, data, name) || {};

    return (
        <div className="Current">
            <div className="Current-Name">{name}</div>
            {!noBranchList && (
                <>
                    <BranchList noBranch={noBranch} type={type} />
                    {!noBranch && (
                        <div className="Current-LastCommit">
                            Last commit
                            <span className="Current-LastCommit_style_blue"> {hash}</span> on
                            <span className="Current-LastCommit_style_blue"> {date}</span> by
                            <div className="Current-LastCommit_style_commiter">{commiter}</div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

Current.defaultProps = {
    noBranch: false,
    noBranchList: false,
};

export default connect(mapStateToProps)(Current);
