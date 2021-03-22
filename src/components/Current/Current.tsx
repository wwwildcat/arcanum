import React from 'react';
import { connect } from 'react-redux';
import BranchList from '../BranchList/BranchList';
import State, { ObjectData, FileData } from '../../store/types';
import './Current.scss';

interface Props {
    tableData: ObjectData[];
    fileData: FileData;
    noCurrentBranch: boolean;
    noBranchList?: boolean;
    name: string;
    type: 'tree' | 'blob';
}

const mapStateToProps = (state: State) => ({
    tableData: state.currentTableContent,
    fileData: state.currentFile,
    name: state.currentView,
});

const getLastCommit = (data: ObjectData[]) =>
    [...data].sort((a, b) => Number(new Date(b.absDate)) - Number(new Date(a.absDate)))[0];

const Current = ({ noCurrentBranch, noBranchList, tableData, fileData, name, type }: Props) => {
    const { hash, commiter, date } = type === 'blob' ? fileData : getLastCommit(tableData) ?? {};

    return (
        <div className="Current">
            <div className="Current-Name">{name}</div>
            {!noBranchList && (
                <>
                    <BranchList noCurrentBranch={noCurrentBranch} type={type} />
                    {!noCurrentBranch && (
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
    noBranchList: false,
};

export default connect(mapStateToProps)(Current);
